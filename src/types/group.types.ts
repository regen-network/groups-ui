import type { GroupInfo } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

import type { GroupFormKeys, GroupFormValues } from '@/organisms/group-form'
import type { GroupPolicyFormValues } from '@/organisms/group-policy-form'

import type { UIGroupMember } from './member.types'

// exports

export type { LCDQueryClient as BankQueryClient } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/bank/v1beta1/query.lcd'
export type { LCDQueryClient as GroupQueryClient } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/query.lcd'
export type { GroupInfoSDKType } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'
export type { LCDQueryClient as StakingQueryClient } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/staking/v1beta1/query.lcd'

export type { GroupFormKeys, GroupFormValues, GroupInfo, GroupPolicyFormValues }

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
