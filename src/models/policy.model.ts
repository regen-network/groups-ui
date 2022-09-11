import type {
  GroupPolicyInfo as ChainGroupPolicyInfo,
  PercentageDecisionPolicy,
  ThresholdDecisionPolicy,
} from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

import type { GroupPolicyFormValues } from '@/organisms/group-policy-form'

export type {
  ChainGroupPolicyInfo,
  GroupPolicyFormValues,
  PercentageDecisionPolicy,
  ThresholdDecisionPolicy,
}

export type GroupDecisionPolicy = PercentageDecisionPolicy | ThresholdDecisionPolicy

export type UIGroupPolicyInfo = Omit<ChainGroupPolicyInfo, 'decision_policy'> & {
  decision_policy: GroupDecisionPolicy
}

export function isThresholdPolicy(
  policy: GroupDecisionPolicy,
): policy is ThresholdDecisionPolicy {
  return 'threshold' in policy
}

export function isPercentagePolicy(
  policy: GroupDecisionPolicy,
): policy is PercentageDecisionPolicy {
  return 'percentage' in policy
}
