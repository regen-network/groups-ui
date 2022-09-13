import Long from 'long'

import type { GroupWithPolicyFormValues, UIGroupMetadata } from 'types'

import { MsgWithTypeUrl } from './cosmosgroups'
import { encodeDecisionPolicy } from './policy.messages'

export function createGroupWithPolicyMsg(values: GroupWithPolicyFormValues) {
  const {
    admin,
    description,
    forumLink,
    members,
    name,
    otherMetadata,
    policyAsAdmin,
    quorum,
    threshold,
    votingWindow,
  } = values
  return MsgWithTypeUrl.createGroupWithPolicy({
    admin,
    group_policy_metadata: '',
    group_policy_as_admin: policyAsAdmin === 'true',
    decision_policy: encodeDecisionPolicy({
      quorum,
      threshold,
      votingWindow,
    }),
    group_metadata: JSON.stringify({
      name,
      description,
      forumLink,
      updatedAt: new Date().toString(),
      other: otherMetadata,
    }),
    members: members.map((m) => ({
      address: m.address,
      weight: m.weight.toString(),
      metadata: JSON.stringify(m.metadata),
    })),
  })
}

export function updateGroupMetadataMsg({
  admin,
  metadata,
  groupId,
}: {
  admin: string
  groupId: string
  metadata: UIGroupMetadata
}) {
  return MsgWithTypeUrl.updateGroupMetadata({
    admin,
    group_id: Long.fromString(groupId),
    metadata: JSON.stringify(metadata),
  })
}
