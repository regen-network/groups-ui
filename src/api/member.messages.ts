import Long from 'long'

import type { MemberFormValues } from 'types'

import { MsgWithTypeUrl } from './cosmosgroups'

export function updateGroupMembersMsg({
  admin,
  groupId,
  members,
}: {
  admin: string
  groupId: string | Long
  members: MemberFormValues[]
}) {
  return MsgWithTypeUrl.updateGroupMembers({
    admin,
    group_id: groupId instanceof Long ? groupId : Long.fromString(groupId),
    member_updates: members.map(({ address, metadata, weight }) => ({
      address,
      metadata: JSON.stringify(metadata),
      weight: weight.toString(),
    })),
  })
}
