import Long from 'long'

import type { MemberFormValues } from 'types'

import { GroupMsgWithTypeUrl } from './cosmosgroups'

export function updateGroupMembersMsg({
  admin,
  groupId,
  members,
}: {
  admin: string
  groupId: string | Long
  members: MemberFormValues[]
}) {
  return GroupMsgWithTypeUrl.updateGroupMembers({
    admin,
    groupId: groupId instanceof Long ? groupId : Long.fromString(groupId),
    memberUpdates: members.map(({ address, metadata, weight }) => ({
      address,
      metadata: JSON.stringify(metadata),
      weight: weight.toString(),
    })),
  })
}
