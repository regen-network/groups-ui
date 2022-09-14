import type {
  ChainGroupDecisionPolicy,
  GroupPolicyInfo,
  UIGroupDecisionPolicy,
  UIGroupPolicyInfo,
  UIPercentageDecisionPolicy,
  UIThresholdDecisionPolicy,
} from 'types'
import { mistypedDurationToDays } from 'util/date'
import { percentStrToNum } from 'util/helpers'

export function toUIGroupPolicy(policyInfo: GroupPolicyInfo): UIGroupPolicyInfo {
  /* By default, `decision_policy` is returned as a golang `Any`, and it seems
   * easier to manage here than `cosmos-groups-ts` as decision policies can be
   * proprietary */
  const decision_policy =
    policyInfo.decision_policy as unknown as ChainGroupDecisionPolicy
  return {
    ...policyInfo,
    decision_policy: {
      ...decision_policy,
      windows: {
        voting_period: mistypedDurationToDays(decision_policy.windows.voting_period),
        min_execution_period: mistypedDurationToDays(
          decision_policy.windows.min_execution_period,
        ),
      },
    },
  }
}

export function isThresholdPolicy(
  policy: UIGroupDecisionPolicy,
): policy is UIThresholdDecisionPolicy {
  return 'threshold' in policy
}

export function isPercentagePolicy(
  policy: UIGroupDecisionPolicy,
): policy is UIPercentageDecisionPolicy {
  return 'percentage' in policy
}

export function formatThreshold(
  { decision_policy }: UIGroupPolicyInfo,
  defaultValue = '-',
): string {
  return isThresholdPolicy(decision_policy)
    ? decision_policy.threshold.toString()
    : defaultValue
}

export function formatPercentage(
  { decision_policy }: UIGroupPolicyInfo,
  defaultValue = '-',
): string {
  return isPercentagePolicy(decision_policy)
    ? percentStrToNum(decision_policy.percentage) + '%'
    : defaultValue
}

export function formatVotingPeriod(
  { decision_policy }: UIGroupPolicyInfo,
  defaultValue = '-',
): string {
  return isPercentagePolicy(decision_policy) || isThresholdPolicy(decision_policy)
    ? decision_policy.windows.voting_period + ' days'
    : defaultValue
}
