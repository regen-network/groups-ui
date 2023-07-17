import { ProposalUpdateGroupFormValues } from 'types'

import { DecisionPolicyFormValues } from '@/organisms/update-group-decision-policy-form'
import { MembersFormValues } from '@/organisms/update-group-members-form'
import { MetadataFormValues } from '@/organisms/update-group-metadata-form'

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

export function isMetadataValues(
  values: ProposalUpdateGroupFormValues,
): values is MetadataFormValues {
  return values.updateGroupType === 'metadata'
}
