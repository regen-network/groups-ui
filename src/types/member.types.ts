import type {
  GroupMember,
  GroupMemberSDKType,
  Member,
} from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

import type { WithRequiredProperty } from './type-utils'

export type { /* GroupMember, */ GroupMemberSDKType }

export type MemberFormValues = {
  address: string
  metadata?: string
  addedAt?: Date
  weight: number
}

// export type UIGroupMember = WithRequiredProperty<GroupMember, 'member'>

// type UIMember = Member & {
//   addedAt: Date
// }

interface UIMember extends Member {
  addedAt: Date
}

export interface UIGroupMember extends GroupMember {
  member: UIMember
}
