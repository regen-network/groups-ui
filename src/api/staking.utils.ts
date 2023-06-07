import type {
  ClaimFormValues,
  DelegateFormValues,
  ProposalStakeFormValues,
  RedelegateFormValues,
  UndelegateFormValues,
} from 'types'

export function isDelegateValues(
  values: ProposalStakeFormValues,
): values is DelegateFormValues {
  return values.stakeType === 'delegate'
}

export function isRedelegateValues(
  values: ProposalStakeFormValues,
): values is RedelegateFormValues {
  return values.stakeType === 'redelegate'
}

export function isUndelegateValues(
  values: ProposalStakeFormValues,
): values is UndelegateFormValues {
  return values.stakeType === 'undelegate'
}

export function isClaimValues(
  values: ProposalStakeFormValues,
): values is ClaimFormValues {
  return values.stakeType === 'claim'
}
