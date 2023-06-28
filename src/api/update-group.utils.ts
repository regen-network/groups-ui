import { ProposalUpdateGroupFormValues } from 'types'

import { DecisionPolicyFormValues } from '@/organisms/update-group-decision-policy-form'

export function isDecisionPolicyValues(
  values: ProposalUpdateGroupFormValues,
): values is DecisionPolicyFormValues {
  return values.updateGroupType === 'decision-policy'
}
