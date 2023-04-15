import type {
  DecisionPolicyWindows,
  GroupPolicyInfo,
  PercentageDecisionPolicy,
  PercentageDecisionPolicySDKType,
  ThresholdDecisionPolicy,
  ThresholdDecisionPolicySDKType,
} from '@haveanicedavid/regen-ts/types/codegen/cosmos/group/v1/types'

// exports
export type { GroupPolicyInfoSDKType } from '@haveanicedavid/regen-ts/types/codegen/cosmos/group/v1/types'

export type { GroupPolicyInfo }

export type UIPercentageDecisionPolicy = WithWindows<PercentageDecisionPolicy>

export type UIThresholdDecisionPolicy = WithWindows<ThresholdDecisionPolicy>

export type ChainGroupDecisionPolicy = PercentageDecisionPolicy | ThresholdDecisionPolicy
export type ChainGroupDecisionPolicySDK =
  | PercentageDecisionPolicySDKType
  | ThresholdDecisionPolicySDKType

export type UIGroupDecisionPolicy = UIPercentageDecisionPolicy | UIThresholdDecisionPolicy

export type UIGroupPolicyInfo = Omit<GroupPolicyInfo, 'decisionPolicy'> & {
  decisionPolicy: UIGroupDecisionPolicy
}

type UIDecisionPolicyWindows = {
  // TODO: should this be a string? number seems better for UI, but conversion
  // might have more side-effects
  [K in keyof DecisionPolicyWindows]: string
}

type WithWindows<T> = Omit<T, 'windows'> & { windows: UIDecisionPolicyWindows }
