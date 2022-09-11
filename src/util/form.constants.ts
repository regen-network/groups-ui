import type { GroupFormValues, MemberFormValues } from 'types'

import { GroupPolicyFormValues } from '@/organisms/group-policy-form'

export const defaultMemberFormValues: MemberFormValues = {
  address: '',
  weight: 1,
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

export const defaultGroupPolicyFormValues: GroupPolicyFormValues = {
  votingWindow: 0,
  threshold: 51,
}
