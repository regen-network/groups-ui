import type {
  ClaimFormValues,
  DelegateFormValues,
  ProposalStakeFormValues,
  RedelegateFormValues,
} from 'types'

export function isDelegateValues(
  values: ProposalStakeFormValues,
): values is DelegateFormValues {
  return values.stakeType === 'delegate' || values.stakeType === 'undelegate'
}

export function isRedelegateValues(
  values: ProposalStakeFormValues,
): values is RedelegateFormValues {
  return values.stakeType === 'redelegate'
}

export function isClaimValues(
  values: ProposalStakeFormValues,
): values is ClaimFormValues {
  return values.stakeType === 'claim'
}
