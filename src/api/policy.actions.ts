import Long from 'long'

import { throwError } from 'util/errors'

import { Group } from 'store'

import { toUIGroupPolicy } from './policy.utils'

export async function fetchGroupPolicies(groupId?: string | Long) {
  if (!Group.query) throwError('Wallet not initialized')
  if (!groupId) throwError('groupId is required')
  try {
    const { group_policies } = await Group.query.groupPoliciesByGroup({
      groupId: groupId instanceof Long ? groupId : Long.fromString(groupId),
    })
    return group_policies.map(toUIGroupPolicy)
  } catch (error) {
    throwError(error)
  }
}
