import type { GroupInfo } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

import { UIGroup } from 'models'

export function groupToUIGroup(group: GroupInfo): UIGroup {
  // TODO - add AJV validation and error handling / filtering for invalid metadata
  return {
    ...group,
    metadata: JSON.parse(group.metadata),
  } as UIGroup
}
