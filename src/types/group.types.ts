import type { GroupInfo } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

export type { GroupInfoSDKType } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

import type { GroupFormValues } from '@/organisms/group-form'
import type { GroupPolicyFormValues } from '@/organisms/group-policy-form'

import type { UIGroupMember } from './member.types'

// Exports

export type { GroupFormValues, GroupInfo, GroupPolicyFormValues }

export type GroupWithPolicyFormValues = GroupFormValues & GroupPolicyFormValues

export type UIGroup = Omit<GroupInfo, 'metadata'> & {
  metadata: UIGroupMetadata
}

export type UIGroupWithMembers = UIGroup & {
  members: UIGroupMember[]
}

export type UIGroupMetadata = {
  name: string
  description?: string
  forumLink?: string
  updatedAt: string
  other?: string
}
