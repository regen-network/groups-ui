import type {
  DecisionPolicyWindows,
  GroupPolicyInfo,
  PercentageDecisionPolicy,
  ThresholdDecisionPolicy,
} from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

export type { DecisionPolicyWindows, GroupPolicyInfo }

type UIDecisionPolicyWindows = {
  [K in keyof DecisionPolicyWindows]: number
}

export type UIPercentageDecisionPolicy = Omit<PercentageDecisionPolicy, 'windows'> & {
  windows: UIDecisionPolicyWindows
}

export type UIThresholdDecisionPolicy = Omit<ThresholdDecisionPolicy, 'windows'> & {
  windows: UIDecisionPolicyWindows
}

export type ChainGroupDecisionPolicy = PercentageDecisionPolicy | ThresholdDecisionPolicy

export type UIGroupDecisionPolicy = UIPercentageDecisionPolicy | UIThresholdDecisionPolicy

export type UIGroupPolicyInfo = Omit<GroupPolicyInfo, 'decision_policy'> & {
  decision_policy: UIGroupDecisionPolicy
}
