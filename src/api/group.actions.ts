import Long from 'long'

import { type GroupWithPolicyFormValues, type UIGroup } from 'types'
import { throwError } from 'util/errors'

import { Group, signAndBroadcast } from 'store'

import { createGroupWithPolicyMsg } from './group.messages'
import { addMembersToGroups, toUIGroup } from './group.transforms'

export async function createGroupWithPolicy(values: GroupWithPolicyFormValues) {
  try {
    const msg = createGroupWithPolicyMsg(values)
    const data = await signAndBroadcast([msg])
    let groupId
    if (data.rawLog) {
      const [raw] = JSON.parse(data.rawLog)
      const idRaw = raw.events[0].attributes[0].value
      groupId = JSON.parse(idRaw)
    }
    return { ...data, groupId }
  } catch (error) {
    throwError(error)
  }
}

export async function fetchGroupsWithMembersByMember(address?: string) {
  const groups = await fetchGroupsByMember(address)
  return addMembersToGroups(groups)
}

export async function fetchGroupsWithMembersByAdmin(address?: string) {
  const groups = await fetchGroupsByAdmin(address)
  return addMembersToGroups(groups)
}

export async function fetchGroupById(groupId?: string | Long): Promise<UIGroup> {
  if (!Group.query) throwError('Wallet not initialized')
  if (!groupId) throwError('groupId is required')
  try {
    const { info } = await Group.query.groupInfo({
      group_id: groupId instanceof Long ? groupId : Long.fromString(groupId),
    })
    return toUIGroup(info)
  } catch (error) {
    throwError(error)
  }
}

export async function fetchGroupsByMember(address?: string): Promise<UIGroup[]> {
  if (!Group.query) throwError('Wallet not initialized')
  if (!address) throwError('cannot fetch group members without an address')
  try {
    const { groups } = await Group.query.groupsByMember({
      address,
      // pagination: PageRequest.encode({key}).finish(),
    })
    const UIGroups = groups.map(toUIGroup)
    return UIGroups
  } catch (error) {
    throwError(error)
  }
}

export async function fetchGroupsByAdmin(admin?: string): Promise<UIGroup[]> {
  if (!Group.query) throwError('Wallet not initialized')
  if (!admin) throwError('No admin ID passed to fetchGroups')
  try {
    const { groups } = await Group.query.groupsByAdmin({
      admin,
    })
    return groups.map(toUIGroup)
  } catch (error) {
    throwError(error)
  }
}
