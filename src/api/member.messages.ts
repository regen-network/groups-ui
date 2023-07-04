import { cosmos } from '@regen-network/api'

import { GroupMsgWithTypeUrl } from './cosmosgroups'
import { MembersMsgParams, toMembersMsgValue } from './member.utils'

export function msgUpdateGroupMembers(params: MembersMsgParams) {
  return GroupMsgWithTypeUrl.updateGroupMembers(toMembersMsgValue(params))
}

export function msgUpdateGroupMembersProposal(params: MembersMsgParams) {
  const value = cosmos.group.v1.MsgUpdateGroupMembers.encode(
    toMembersMsgValue(params),
  ).finish()
  return {
    value,
    typeUrl: '/cosmos.group.v1.MsgUpdateGroupMembers',
  }
}
