import Long from 'long'

import { throwError } from 'util/errors'

import { Group } from 'store'

export async function fetchGroupMembers(groupId?: string | Long) {
  if (!Group.query) throwError('Wallet not initialized')
  if (!groupId) throwError('groupId is required')
  try {
    const { members } = await Group.query.groupMembers({
      group_id: groupId instanceof Long ? groupId : Long.fromString(groupId),
    })
    console.log('members :>> ', members)
    return members
  } catch (error) {
    throwError(error)
  }
}
