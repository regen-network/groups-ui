import type {
  GroupMember,
  Member,
} from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

export { GroupMember, Member }

export type MemberFormValues = {
  address: string
  metadata?: string
  addedAt?: Date
  weight: number
}
