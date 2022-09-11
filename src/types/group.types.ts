import type {
  GroupInfo,
  GroupMember,
} from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

import type { GroupFormValues } from '@/organisms/group-form'
import type { GroupPolicyFormValues } from '@/organisms/group-policy-form'

// Exports

export type { GroupFormValues, GroupInfo, GroupPolicyFormValues }

export type GroupWithPolicyFormValues = GroupFormValues & GroupPolicyFormValues

export type GroupWithMembers = GroupInfo & {
  members: GroupMember[]
}

export type UIGroup = Omit<GroupInfo, 'metadata'> & {
  metadata: UIGroupMetadata
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
