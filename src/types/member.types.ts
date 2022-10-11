import type {
  GroupMember,
  GroupMemberSDKType,
  Member,
} from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

export type { GroupMember, GroupMemberSDKType, Member }

export type MemberFormValues = {
  address: string
  metadata?: string
  addedAt?: Date
  weight: number
}
