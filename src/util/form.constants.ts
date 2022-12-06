import type {
  DelegateFormValues,
  GroupFormValues,
  GroupPolicyFormValues,
  MemberFormValues,
} from 'types'

export const defaultMemberFormValues = (): MemberFormValues => ({
  address: '',
  weight: 1,
  addedAt: new Date(),
})

export const defaultGroupFormValues: GroupFormValues = {
  admin: '',
  name: '',
  members: [],
  policyAsAdmin: 'true',
  description: '',
  forumLink: '',
  otherMetadata: '',
}

export const DEFAULT_VOTING_WINDOW = 1
export const DEFAULT_MEMBER_WEIGHT = 1

export const defaultGroupPolicyFormValues: GroupPolicyFormValues = {
  votingWindow: DEFAULT_VOTING_WINDOW,
}

export const defaultDelegateFormValues: DelegateFormValues = {
  amount: '',
  validator: '',
}
