export type { MemberRequest } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

export type MemberFormValues = {
  address: string
  metadata?: string
  weight: number
}

export const defaultMemberFormValues: MemberFormValues = {
  address: '',
  weight: 1,
}
