import { GroupMemberSDKType, UIGroupMember } from 'types'
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
