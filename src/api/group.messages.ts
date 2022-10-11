import Long from 'long'

import type { GroupWithPolicyFormValues, UIGroupMetadata } from 'types'
import { clearEmptyStr } from 'util/helpers'

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
    percentage,
    threshold,
    votingWindow,
  } = values
  return MsgWithTypeUrl.createGroupWithPolicy({
    admin,
    groupPolicyMetadata: '',
    groupPolicyAsAdmin: policyAsAdmin === 'true',
    decisionPolicy: encodeDecisionPolicy({
      percentage: clearEmptyStr(percentage),
      threshold: clearEmptyStr(threshold),
      votingWindow: votingWindow,
    }),
    groupMetadata: JSON.stringify({
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
    groupId: Long.fromString(groupId),
    metadata: JSON.stringify(metadata),
  })
}
