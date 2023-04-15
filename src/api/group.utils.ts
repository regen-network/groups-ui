import type {
  GroupInfoSDKType,
  MemberFormValues,
  UIGroup,
  UIGroupMember,
  UIGroupMetadata,
  UIGroupWithMembers,
} from 'types'
import { toDate } from 'util/date'

import { fetchGroupMembers } from './member.actions'

/** Parses chain-group and returns typed metadata */
export function toUIGroup(group: GroupInfoSDKType): UIGroup {
  // TODO - add AJV validation and error handling / filtering for invalid metadata
  let metadata: UIGroupMetadata
  if (group.metadata) {
    metadata = JSON.parse(group.metadata)
  } else {
    metadata = {
      name: '',
      updatedAt: '',
    }
  }
  return {
    metadata,
    admin: group.admin,
    createdAt: group.created_at ? toDate(group.created_at) : undefined,
    id: group.id,
    totalWeight: group.total_weight,
    version: group.version,
  }
}

export async function addMembersToGroups(
  groups?: UIGroup[],
): Promise<UIGroupWithMembers[]> {
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

export function toMemberFormValues({ member }: UIGroupMember): MemberFormValues {
  return {
    address: member.address,
    weight: parseInt(member.weight),
    addedAt: member.addedAt ? toDate(member.addedAt) : undefined,
  }
}
