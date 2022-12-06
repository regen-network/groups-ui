import Long from 'long'

import { throwError } from 'util/errors'

import { Query } from 'store'

import { toUIGroupMembers } from './member.utils'

export async function fetchGroupMembers(groupId?: string | Long) {
  if (!Query.groups) throwError('Wallet not initialized')
  if (!groupId) throwError('groupId is required')
  try {
    const { members } = await Query.groups.groupMembers({
      groupId: groupId instanceof Long ? groupId : Long.fromString(groupId),
    })
    return toUIGroupMembers(members)
  } catch (error) {
    throwError(error)
  }
}
