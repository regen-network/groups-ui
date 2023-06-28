import { UIGroup, UIGroupPolicyInfo } from 'types'

export const getPolicyAsGroupAdmin = (group: UIGroup, policy?: UIGroupPolicyInfo) =>
  policy && policy.address === group.admin

export const getPolicyAsPolicyAdmin = (policy?: UIGroupPolicyInfo) =>
  policy && policy.address === policy.admin
