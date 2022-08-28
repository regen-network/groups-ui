import { cosmos } from '@haveanicedavid/cosmos-groups-ts'

import type { GroupFormValues, UIGroup, UIGroupWithMembers } from 'models'
import { Group } from 'store/Group'
import { Wallet } from 'store/Wallet'
import { throwError } from 'util/errors'

import { groupToUIGroup } from './Group.transforms'

export async function createGroup(values: GroupFormValues) {
  const { account, signingClient, fee } = Wallet
  if (!account || !signingClient || !fee) throwError('Wallet not initialized')
  try {
    const msg = createGroupMsg(values)
    const data = await signingClient.signAndBroadcast(account.address, [msg], fee)
    return data
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

async function fetchGroupsByMember(address?: string): Promise<UIGroup[]> {
  if (!Group.query || !address) throwError('Wallet not initialized')
  try {
    const { groups } = await Group.query.groupsByMember({
      address,
    })
    return groups.map(groupToUIGroup)
  } catch (error) {
    throwError(error)
  }
}

async function fetchGroupsByAdmin(admin?: string): Promise<UIGroup[]> {
  if (!Group.query || !admin) throwError('Wallet not initialized')
  try {
    const { groups } = await Group.query.groupsByAdmin({
      admin,
    })
    return groups.map(groupToUIGroup)
  } catch (error) {
    throwError(error)
  }
}

async function addMembersToGroups(groups: UIGroup[]): Promise<UIGroupWithMembers[]> {
  const groupIds = groups.map((g) => g.id)
  const members = await Promise.all(groupIds.map(fetchGroupMembers))
  return groups.map((g, i) => {
    return {
      ...g,
      members: members[i],
    }
  })
}

async function fetchGroupMembers(groupId: UIGroup['id']) {
  if (!Group.query) throwError('Wallet not initialized')
  try {
    const { members } = await Group.query.groupMembers({ groupId })
    return members
  } catch (error) {
    throwError(error)
  }
}

/** Take form values and return a msg to be broadcast */
function createGroupMsg({
  admin,
  members,
  name,
  description,
  forumLink,
  otherMetadata,
}: GroupFormValues) {
  return cosmos.group.v1.MessageComposer.withTypeUrl.createGroup({
    admin,
    metadata: JSON.stringify({
      name,
      description,
      forumLink,
      other: otherMetadata,
    }),
    members: members.map((m) => ({
      address: m.address,
      weight: m.weight.toString(),
      metadata: JSON.stringify(m.metadata),
    })),
  })
}
