import type { GroupInfo } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

import type { NumOrEmpty } from './form.types'
import type { MemberFormValues, UIGroupMember } from './member.types'

// exports

export type { LCDQueryClient as GroupQueryClient } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/query.lcd'
export type { GroupInfoSDKType } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'
export type { LCDQueryClient as StakingQueryClient } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/staking/v1beta1/query.lcd'
export type { GroupInfo }

/** @see @haveanicedavid/cosmos-groups-ts/types/proto/cosmos/group/v1/types */
export type GroupFormValues = {
  admin: 'policy' | string
  description?: string
  policyAsAdmin: 'true' | 'false'
  forumLink?: string
  members: MemberFormValues[]
  name: string
  otherMetadata?: string
}
export type GroupFormKeys = keyof GroupFormValues

export type GroupPolicyFormValues = {
  votingWindow: number
  threshold?: NumOrEmpty
  percentage?: NumOrEmpty
}

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
