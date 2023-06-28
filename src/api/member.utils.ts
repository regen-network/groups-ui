import Long from 'long'

import { GroupMemberSDKType, MemberFormValues, UIGroupMember } from 'types'
import { toDate } from 'util/date'

const isGroupMember = (m: UIGroupMember | null): m is UIGroupMember => !!m

export function toUIGroupMembers(member: GroupMemberSDKType[]): UIGroupMember[] {
  return member.map(toUIGroupMember).filter(isGroupMember)
}

function toUIGroupMember({ group_id, member }: GroupMemberSDKType): UIGroupMember | null {
  if (!member) return null
  return {
    groupId: group_id,
    member: {
      addedAt: member.added_at ? toDate(member.added_at) : undefined,
      address: member.address,
      metadata: member.metadata,
      weight: member.weight,
    },
  }
}

export type MembersMsgParams = {
  admin: string
  groupId: string | Long
  members: MemberFormValues[]
}

export function toMsgValue({ admin, groupId, members }: MembersMsgParams) {
  return {
    admin,
    groupId: groupId instanceof Long ? groupId : Long.fromString(groupId),
    memberUpdates: members.map(({ address, metadata, weight }) => ({
      address,
      metadata: JSON.stringify(metadata) || '',
      weight: weight.toString(),
    })),
  }
}
