import type {
  GroupInfo,
  GroupMember,
} from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

import type { MemberFormValues } from './Member.model'
export { GroupInfo, GroupMember }

/** @see @haveanicedavid/cosmos-groups-ts/types/proto/cosmos/group/v1/types */
export type GroupFormValues = {
  admin: string
  description?: string
  forumLink?: string
  members: MemberFormValues[]
  name: string
  otherMetadata?: string
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
  name: 'whell hello',
  members: [],
}
