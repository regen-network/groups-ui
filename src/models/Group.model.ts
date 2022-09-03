import { cosmos } from '@haveanicedavid/cosmos-groups-ts'
import type {
  GroupInfo,
  GroupMember,
} from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

import type { MemberFormValues } from './Member.model'
export { GroupInfo, GroupMember }

export const cosmosgroups = cosmos.group.v1

export type GroupWithPolicyFormValues = GroupFormValues & GroupPolicyFormValues

/** @see @haveanicedavid/cosmos-groups-ts/types/proto/cosmos/group/v1/types */
export type GroupFormValues = {
  admin: string
  description?: string
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

export type GroupWithMembers = GroupInfo & {
  members: GroupMember[]
}

export type UIGroup = Omit<GroupInfo, 'metadata'> & {
  metadata: UIGroupMetadata
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
}

export const defaultGroupPolicyFormValues: GroupPolicyFormValues = {
  votingWindow: 0,
  threshold: 0,
}
