import type { ChainGroup, UIGroup, UIGroupMetadata, UIGroupWithMembers } from 'models'

import { fetchGroupMembers } from './member.actions'

/** Parses chain-group and returns typed metadata */
export function toUIGroup(group: ChainGroup): UIGroup {
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
    ...group,
    metadata,
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
