import Long from 'long'

import { throwError } from 'util/errors'

import { Query } from 'store/query.store'

import { toUIGroupPolicy } from './policy.utils'
// import { fetchProposalsByGroupPolicy } from './proposal.actions'

export async function fetchGroupPolicies(groupId?: string | Long) {
  if (!Query.groups) throwError('Wallet not initialized')
  if (!groupId) throwError('groupId is required')
  try {
    const { group_policies } = await Query.groups.groupPoliciesByGroup({
      groupId: groupId instanceof Long ? groupId : Long.fromString(groupId),
    })
    return group_policies.map(toUIGroupPolicy)
  } catch (error) {
    throwError(error)
  }
}
