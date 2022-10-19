import type {
  GroupMember,
  Member,
} from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

// exports

export type { GroupMemberSDKType } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

export type MemberFormValues = {
  address: string
  metadata?: string
  addedAt?: Date
  weight: number
}

export interface UIGroupMember extends GroupMember {
  member: UIMember
}

interface UIMember extends Member {
  addedAt: Date
}
