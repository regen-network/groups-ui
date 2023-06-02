import type {
  ClaimFormValues,
  DelegateFormValues,
  GroupFormValues,
  GroupPolicyFormValues,
  MemberFormValues,
  ProposalSendFormValues,
  ProposalStakeFormValues,
  RedelegateFormValues,
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
  policyType: 'threshold',
  percentage: 51,
}

export const defaultSendFormValues: ProposalSendFormValues = {
  toAddress: '',
  amount: '',
  denom: '',
  sendType: 'single',
}

export const defaultDelegateFormValues: DelegateFormValues = {
  amount: '',
  denom: '',
  validator: '',
  stakeType: 'delegate',
}

export const defaultUndelegateFormValues: DelegateFormValues = {
  amount: '',
  denom: '',
  validator: '',
  stakeType: 'undelegate',
}

export const defaultRedelegateFormValues: RedelegateFormValues = {
  amount: '',
  denom: '',
  fromValidator: '',
  toValidator: '',
  stakeType: 'redelegate',
}

export const defaultClaimFormValues: ClaimFormValues = {
  amount: '',
  denom: '',
  stakeType: 'claim',
}

export const defaultStakeFormValues: ProposalStakeFormValues = {
  // `delegate` is the default stake type - copying here to avoid confusing naming
  ...defaultDelegateFormValues,
}
