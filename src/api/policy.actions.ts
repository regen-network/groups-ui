import Long from 'long'

import { throwError } from 'util/errors'

import { Group } from 'store'

export async function fetchGroupPolicies(groupId?: string | Long) {
  if (!Group.query) throwError('Wallet not initialized')
  if (!groupId) throwError('groupId is required')
  try {
    const data = await Group.query.groupPoliciesByGroup({
      group_id: groupId instanceof Long ? groupId : Long.fromString(groupId),
    })
    return data
  } catch (error) {
    throwError(error)
  }
}
