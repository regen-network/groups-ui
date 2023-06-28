import { ProposalUpdateGroupFormValues } from 'types'

import { DecisionPolicyFormValues } from '@/organisms/update-group-decision-policy-form'
import { MembersFormValues } from '@/organisms/update-group-members-form'

export function isDecisionPolicyValues(
  values: ProposalUpdateGroupFormValues,
): values is DecisionPolicyFormValues {
  return values.updateGroupType === 'decision-policy'
}

export function isMembersValues(
  values: ProposalUpdateGroupFormValues,
): values is MembersFormValues {
  return values.updateGroupType === 'members'
}
