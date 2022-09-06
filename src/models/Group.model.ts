import { cosmos } from '@haveanicedavid/cosmos-groups-ts'
import type { GroupInfoRes as ChainGroupRes } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/response.lcd'
import type {
  GroupInfo as ChainGroup,
  GroupMember,
} from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

import type { GroupFormValues } from '@/organisms/GroupForm'
import type { GroupPolicyFormValues } from '@/organisms/GroupPolicyForm'

import type { MemberFormValues } from './Member.model'

// Exports

export const cosmosgroups = cosmos.group.v1

export type {
  ChainGroup,
  ChainGroupRes,
  GroupFormValues,
  GroupMember,
  GroupPolicyFormValues,
  MemberFormValues,
}

export type GroupWithPolicyFormValues = GroupFormValues & GroupPolicyFormValues

export type GroupWithMembers = ChainGroup & {
  members: GroupMember[]
}

export type UIGroup = Omit<ChainGroup, 'metadata' | 'createdAt'> & {
  metadata: UIGroupMetadata
  createdAt: string
}

export type UIGroupWithMembers = UIGroup & {
  members: GroupMember[]
}

export type UIGroupMetadata = {
  name: string
  description?: string
  forumLink?: string
  updatedAt: string
  other?: string
}
