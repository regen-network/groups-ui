import {
  GroupFormValues,
  GroupPolicyFormValues,
  UIGroup,
  UIGroupDecisionPolicy,
  UIGroupMember,
} from 'types'
import { percentStrToNum } from 'util/helpers'

import { isPercentagePolicy, isThresholdPolicy } from 'api/policy.utils'

import {
  DEFAULT_MEMBER_WEIGHT,
  DEFAULT_VOTING_WINDOW,
  defaultGroupPolicyFormValues,
} from './form.defaults'

export const getGroupValues = (
  group: UIGroup,
  members?: UIGroupMember[],
  policyAsGroupAdmin?: boolean,
): GroupFormValues => ({
  admin: group.admin,
  members:
    members?.map(({ member }) => ({
      address: member?.address,
      weight: parseInt(member?.weight || DEFAULT_MEMBER_WEIGHT.toString()),
      metadata: member?.metadata,
    })) || [],
  name: group.metadata.name,
  policyAsAdmin: policyAsGroupAdmin ? 'true' : 'false',
  description: group.metadata.description,
  forumLink: group.metadata.forumLink,
  otherMetadata: group.metadata.other,
})

export const getGroupPolicyValues = (
  decisionPolicy?: UIGroupDecisionPolicy,
): GroupPolicyFormValues =>
  decisionPolicy
    ? {
        threshold: isThresholdPolicy(decisionPolicy)
          ? parseInt(decisionPolicy.threshold)
          : undefined,
        votingWindow: parseInt(
          decisionPolicy?.windows?.votingPeriod || DEFAULT_VOTING_WINDOW.toString(),
        ), //parseFloat(decisionPolicy.windows.voting_period),
        percentage: isPercentagePolicy(decisionPolicy)
          ? percentStrToNum(decisionPolicy.percentage)
          : undefined,
        policyType: isThresholdPolicy(decisionPolicy) ? 'threshold' : 'percentage',
      }
    : defaultGroupPolicyFormValues
