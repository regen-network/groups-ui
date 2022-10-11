import { GroupMember, GroupMemberSDKType } from 'types'

export function toGroupMember({ group_id, member }: GroupMemberSDKType): GroupMember {
  return {
    groupId: group_id,
    member: {
      addedAt: member.added_at,
      address: member.address,
      metadata: member.metadata,
      weight: member.weight,
    },
  }
}
