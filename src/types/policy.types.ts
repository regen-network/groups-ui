import type {
  DecisionPolicyWindows,
  GroupPolicyInfo,
  PercentageDecisionPolicy,
  ThresholdDecisionPolicy,
} from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

export type { GroupPolicyInfo }

export type UIPercentageDecisionPolicy = WithWindows<PercentageDecisionPolicy>

export type UIThresholdDecisionPolicy = WithWindows<ThresholdDecisionPolicy>

export type ChainGroupDecisionPolicy = PercentageDecisionPolicy | ThresholdDecisionPolicy

export type UIGroupDecisionPolicy = UIPercentageDecisionPolicy | UIThresholdDecisionPolicy

export type UIGroupPolicyInfo = Omit<GroupPolicyInfo, 'decision_policy'> & {
  decision_policy: UIGroupDecisionPolicy
}

type UIDecisionPolicyWindows = {
  // TODO: should this be a string? number seems better for UI, but conversion
  // might have more side-effects
  [K in keyof DecisionPolicyWindows]: string
}

type WithWindows<T> = Omit<T, 'windows'> & { windows: UIDecisionPolicyWindows }
