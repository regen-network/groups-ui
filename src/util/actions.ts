import { ENABLED_ACTIONS, UPDATE_GROUP_ACTION } from './constants'

export const getActions = (
  policyAsGroupAdmin?: boolean,
  policyAsPolicyAdmin?: boolean,
) => {
  if (policyAsGroupAdmin || policyAsPolicyAdmin) {
    return [...ENABLED_ACTIONS, UPDATE_GROUP_ACTION]
  }
  return ENABLED_ACTIONS
}
