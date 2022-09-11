import type {
  GroupInfo as ChainGroup,
  GroupMember as ChainGroupMember,
} from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

import type { GroupFormValues } from '@/organisms/group-form'
import type { GroupPolicyFormValues } from '@/organisms/group-policy-form'

// Exports

export type { ChainGroup, GroupFormValues }

export type GroupWithPolicyFormValues = GroupFormValues & GroupPolicyFormValues

export type GroupWithMembers = ChainGroup & {
  members: ChainGroupMember[]
}

export type UIGroup = Omit<ChainGroup, 'metadata'> & {
  metadata: UIGroupMetadata
}

export type UIGroupWithMembers = UIGroup & {
  members: ChainGroupMember[]
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
  policyAsAdmin: 'true',
  description: '',
  forumLink: '',
  otherMetadata: '',
}
