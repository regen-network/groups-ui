import Long from 'long'

import {
  type GroupWithPolicyFormValues,
  type UIGroup,
  type UIGroupWithMembers,
  cosmosgroups,
} from 'models'
import { daysToDuration, secondsToDuration } from 'util/date'
import { throwError } from 'util/errors'

import { Group } from 'store/Group'
import { Wallet } from 'store/Wallet'

import { toUIGroup } from './Group.transforms'

export async function createGroupWithPolicy(values: GroupWithPolicyFormValues) {
  const { account, signingClient, fee } = Wallet
  if (!account || !signingClient || !fee) throwError('Wallet not initialized')
  try {
    const msg = createGroupWithPolicyMsg(values)
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
    console.log('groups :>> ', groups)
    const UIGroups = groups.map(toUIGroup)
    console.log('UIGroups :>> ', UIGroups)
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

export async function fetchGroupMembers(groupId?: string | Long) {
  if (!Group.query) throwError('Wallet not initialized')
  if (!groupId) throwError('groupId is required')
  try {
    const { members } = await Group.query.groupMembers({
      group_id: groupId instanceof Long ? groupId : Long.fromString(groupId),
    })
    console.log('members :>> ', members)
    return members
  } catch (error) {
    throwError(error)
  }
}

export async function fetchGroupPolicies(groupId?: string | Long) {
  if (!Group.query) throwError('Wallet not initialized')
  if (!groupId) throwError('groupId is required')
  try {
    const data = await Group.query.groupPoliciesByGroup({
      group_id: groupId instanceof Long ? groupId : Long.fromString(groupId),
    })
    return data
  } catch (error) {
    throwError(error)
  }
}

function createGroupWithPolicyMsg({
  admin,
  description,
  forumLink,
  members,
  name,
  otherMetadata,
  policyAsAdmin,
  quorum,
  threshold: _threshold,
  votingWindow,
}: GroupWithPolicyFormValues) {
  const groupMembers = members.map((m) => ({
    address: m.address,
    weight: m.weight.toString(),
    metadata: JSON.stringify(m.metadata),
  }))
  const threshold = `${_threshold / 100}`
  let decision_policy
  const windows = {
    min_execution_period: secondsToDuration(1),
    voting_period: daysToDuration(votingWindow),
  }

  if (quorum) {
    decision_policy = {
      type_url: '/cosmos.group.v1.PercentageDecisionPolicy',
      value: cosmosgroups.PercentageDecisionPolicy.encode({
        percentage: `${quorum / 100}`,
        windows,
      }).finish(),
    }
  } else {
    decision_policy = {
      type_url: '/cosmos.group.v1.ThresholdDecisionPolicy',
      value: cosmosgroups.ThresholdDecisionPolicy.encode({
        threshold,
        windows,
      }).finish(),
    }
  }

  return cosmosgroups.MessageComposer.withTypeUrl.createGroupWithPolicy({
    admin,
    decision_policy,
    group_policy_metadata: '',
    group_policy_as_admin: policyAsAdmin === 'true',
    group_metadata: JSON.stringify({
      name,
      description,
      forumLink,
      updatedAt: new Date().toString(),
      other: otherMetadata,
    }),
    members: groupMembers,
  })
}

async function addMembersToGroups(groups?: UIGroup[]): Promise<UIGroupWithMembers[]> {
  const _groups = groups || []
  const groupIds = _groups.map((g) => g.id)
  const members = await Promise.all(groupIds.map(fetchGroupMembers))
  return _groups.map((g, i) => {
    return {
      ...g,
      members: members[i],
    }
  })
}
