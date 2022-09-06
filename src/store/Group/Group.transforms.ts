import type { ChainGroup, ChainGroupRes, UIGroup, UIGroupMetadata } from 'models'
import { toCamelKeys } from 'util/helpers'

function isChainGroupRes(group: ChainGroup | ChainGroupRes): group is ChainGroupRes {
  return 'total_weight' in group
}

export function toUIGroup(group: ChainGroupRes | ChainGroup): UIGroup {
  // TODO - add AJV validation and error handling / filtering for invalid metadata
  const baseObj = isChainGroupRes(group) ? toCamelKeys<ChainGroup>(group) : group
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
    createdAt: new Date(baseObj.createdAt).toISOString(),
    admin: baseObj.admin,
    id: baseObj.id,
    totalWeight: baseObj.totalWeight,
    version: baseObj.version,
  }
}
