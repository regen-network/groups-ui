import type { GroupMember as ChainGroupMember } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

export type { ChainGroupMember }

export type MemberFormValues = {
  address: string
  metadata?: string
  weight: number
}

export const defaultMemberFormValues: MemberFormValues = {
  address: '',
  weight: 1,
}
