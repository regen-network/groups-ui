import type { ChainGroup, UIGroup } from 'models'

export function groupToUIGroup(group: ChainGroup): UIGroup {
  // TODO - add AJV validation and error handling / filtering for invalid metadata
  return {
    ...group,
    metadata: JSON.parse(group.metadata),
  } as UIGroup
}
