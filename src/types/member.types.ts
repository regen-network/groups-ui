import type {
  GroupMember,
  Member,
} from '@haveanicedavid/regen-ts/types/codegen/cosmos/group/v1/types'

// exports

export type { GroupMemberSDKType } from '@haveanicedavid/regen-ts/types/codegen/cosmos/group/v1/types'

export type MemberFormValues = {
  address: string
  metadata?: string
  addedAt?: Date
  weight: number
}

export interface UIGroupMember extends Omit<GroupMember, 'member'> {
  member: UIMember
}

interface UIMember extends Omit<Member, 'addedAt'> {
  addedAt?: Date
}
