import { DecisionPolicyFormValues } from '@/organisms/update-group-decision-policy-form'

export function isDecisionPolicyValues(
  values: DecisionPolicyFormValues,
): values is DecisionPolicyFormValues {
  return values.updateGroupType === 'decision-policy'
}
