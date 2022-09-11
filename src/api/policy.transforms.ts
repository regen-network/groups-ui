import type { ChainGroupPolicyInfo, GroupDecisionPolicy, UIGroupPolicyInfo } from 'models'

export function toUIGroupPolicy(policyInfo: ChainGroupPolicyInfo): UIGroupPolicyInfo {
  return {
    ...policyInfo,
    // Type generation doesn't properly type this, and it seems easier to manage
    // here than `cosmos-groups-ts` as decision policies can be proprietary
    decision_policy: policyInfo.decision_policy as unknown as GroupDecisionPolicy,
  }
}
