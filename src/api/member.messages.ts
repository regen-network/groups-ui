import { cosmos } from '@regen-network/api'

import { GroupMsgWithTypeUrl } from './cosmosgroups'
import { MembersMsgParams, toMsgValue } from './member.utils'

export function msgUpdateGroupMembers(params: MembersMsgParams) {
  return GroupMsgWithTypeUrl.updateGroupMembers(toMsgValue(params))
}

export function msgUpdateGroupMembersProposal(params: MembersMsgParams) {
  const value = cosmos.group.v1.MsgUpdateGroupMembers.encode(toMsgValue(params)).finish()
  return {
    value,
    typeUrl: '/cosmos.group.v1.MsgUpdateGroupMembers',
  }
}
