import type { ChainGroup, UIGroup, UIGroupMetadata } from 'models'
// import { toCamelKeys } from 'util/helpers'

// function isChainGroupRes(group: ChainGroup | ChainGroupRes): group is ChainGroupRes {
//   return 'total_weight' in group
// }

export function toUIGroup(group: ChainGroup): UIGroup {
  // TODO - add AJV validation and error handling / filtering for invalid metadata
  // TODO - converting keys shouldn't be needed anymore
  // const baseObj = isChainGroupRes(group) ? toCamelKeys<ChainGroup>(group) : group
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
