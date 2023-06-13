import { Event } from '@regen-network/api/types/codegen/tendermint/abci/types'
import Long from 'long'

import type { GroupWithPolicyFormValues, UIGroup } from 'types'
import { throwError } from 'util/errors'
import { isJson } from 'util/validation'

import { Query } from 'store/query.store'
import { signAndBroadcast } from 'store/wallet.store'

import { txError } from './api.constants'
import { msgCreateGroupWithPolicy } from './group.messages'
import { addMembersToGroups, toUIGroup } from './group.utils'

export async function createGroupWithPolicy(values: GroupWithPolicyFormValues) {
  const msg = msgCreateGroupWithPolicy(values)
  const data = await signAndBroadcast([msg])
  if (!data) throwError(txError)
  let groupId
  if (data.rawLog && isJson(data.rawLog)) {
    const [raw] = JSON.parse(data.rawLog)
    const idRaw = raw.events.find(
      (e: Event) => e.type === 'cosmos.group.v1.EventCreateGroup',
    ).attributes[0].value
    groupId = String(JSON.parse(idRaw))
  }
  return { ...data, groupId }
}

export async function fetchGroupsWithMembersByMember(address?: string) {
  const groups = await fetchGroupsByMember(address)
  return addMembersToGroups(groups)
}

export async function fetchGroupsWithMembersByAdmin(address?: string) {
  const groups = await fetchGroupsByAdmin(address)
  return addMembersToGroups(groups)
}

export async function fetchGroupById(groupId?: string | Long): Promise<UIGroup | null> {
  if (!Query.groups) throwError('Wallet not initialized')
  if (!groupId) throwError('groupId is required')
  try {
    const { info } = await Query.groups.groupInfo({
      groupId: groupId instanceof Long ? groupId : Long.fromString(groupId),
    })
    if (!info) return null
    return toUIGroup(info)
  } catch (error) {
    throwError(error)
  }
}

export async function fetchGroupsByMember(address?: string): Promise<UIGroup[]> {
  if (!Query.groups) throwError('Wallet not initialized')
  if (!address) throwError('cannot fetch group members without an address')
  try {
    const { groups } = await Query.groups.groupsByMember({
      address,
      // pagination: PageRequest.encode({key}).finish(),
    })
    return Promise.all(groups.map(toUIGroup))
  } catch (error) {
    throwError(error)
  }
}

export async function fetchGroupsByAdmin(admin?: string): Promise<UIGroup[]> {
  if (!Query.groups) throwError('Wallet not initialized')
  if (!admin) throwError('No admin ID passed to fetchGroups')
  try {
    const { groups } = await Query.groups.groupsByAdmin({
      admin,
    })
    return Promise.all(groups.map(toUIGroup))
  } catch (error) {
    throwError(error)
  }
}
