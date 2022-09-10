import type { ChainGroup, UIGroup, UIGroupMetadata } from 'models'

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
