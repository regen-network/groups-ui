import { cosmos } from '@haveanicedavid/cosmos-groups-ts'
import type { GroupInfoRes as ChainGroupRes } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/response.lcd'
import type {
  GroupInfo as ChainGroup,
  GroupMember,
} from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

import type { MemberFormValues } from './Member.model'
export { ChainGroup, ChainGroupRes, GroupMember }

export const cosmosgroups = cosmos.group.v1

export type GroupWithPolicyFormValues = GroupFormValues & GroupPolicyFormValues

/** @see @haveanicedavid/cosmos-groups-ts/types/proto/cosmos/group/v1/types */
export type GroupFormValues = {
  admin: 'policy' | string
  description?: string
  policyAsAdmin: boolean
  forumLink?: string
  members: MemberFormValues[]
  name: string
  otherMetadata?: string
}

export type GroupPolicyFormValues = {
  votingWindow: number
  threshold: number
  quorum?: number
}

export type GroupWithMembers = ChainGroup & {
  members: GroupMember[]
}

export type UIGroup = Omit<ChainGroup, 'metadata' | 'createdAt'> & {
  metadata: UIGroupMetadata
  createdAt: string
}

export type UIGroupWithMembers = UIGroup & {
  members: GroupMember[]
}

export type UIGroupMetadata = {
  name: string
  description?: string
  forumLink?: string
  updatedAt: string
  other?: string
}

export const defaultGroupFormValues: GroupFormValues = {
  admin: '',
  name: '',
  members: [],
  policyAsAdmin: true,
}

export const defaultGroupPolicyFormValues: GroupPolicyFormValues = {
  votingWindow: 0,
  threshold: 51,
}
