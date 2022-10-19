import type {
  ChainGroupDecisionPolicySDK,
  GroupPolicyInfoSDKType,
  UIGroupDecisionPolicy,
  UIGroupPolicyInfo,
  UIPercentageDecisionPolicy,
  UIThresholdDecisionPolicy,
} from 'types'
import { mistypedDurationToDays } from 'util/date'
import { percentStrToNum } from 'util/helpers'

export function toUIGroupPolicy(policyInfo: GroupPolicyInfoSDKType): UIGroupPolicyInfo {
  /* By default, `decisionPolicy` is returned as a golang `Any`, and it seems
   * easier to manage here than `cosmos-groups-ts` as decision policies can be
   * proprietary */
  const decisionPolicy =
    policyInfo.decision_policy as unknown as ChainGroupDecisionPolicySDK
  return {
    address: policyInfo.address,
    admin: policyInfo.admin,
    createdAt: policyInfo.created_at,
    metadata: policyInfo.metadata,
    version: policyInfo.version,
    groupId: policyInfo.group_id,
    decisionPolicy: {
      ...decisionPolicy,
      windows: {
        votingPeriod: mistypedDurationToDays(decisionPolicy.windows?.voting_period),
        minExecutionPeriod: mistypedDurationToDays(
          decisionPolicy.windows?.min_execution_period,
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
  { decisionPolicy }: UIGroupPolicyInfo,
  defaultValue = '-',
): string {
  return isThresholdPolicy(decisionPolicy)
    ? decisionPolicy.threshold.toString()
    : defaultValue
}

export function formatPercentage(
  { decisionPolicy }: UIGroupPolicyInfo,
  defaultValue = '-',
): string {
  return isPercentagePolicy(decisionPolicy)
    ? percentStrToNum(decisionPolicy.percentage) + '%'
    : defaultValue
}

export function formatVotingPeriod(
  { decisionPolicy }: UIGroupPolicyInfo,
  defaultValue = '-',
): string {
  return isPercentagePolicy(decisionPolicy) || isThresholdPolicy(decisionPolicy)
    ? decisionPolicy.windows.votingPeriod + ' days'
    : defaultValue
}
