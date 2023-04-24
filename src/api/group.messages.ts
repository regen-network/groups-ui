import Long from 'long'

import type { GroupWithPolicyFormValues, UIGroupMetadata } from 'types'
import { clearEmptyStr } from 'util/helpers'

import { GroupMsgWithTypeUrl } from './cosmosgroups'
import { encodeDecisionPolicy } from './policy.messages'

export function msgCreateGroupWithPolicy(values: GroupWithPolicyFormValues) {
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
    policyType,
    votingWindow,
  } = values
  return GroupMsgWithTypeUrl.createGroupWithPolicy({
    admin,
    groupPolicyMetadata: '',
    groupPolicyAsAdmin: policyAsAdmin === 'true',
    decisionPolicy: encodeDecisionPolicy({
      policyType,
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
      metadata: '',
      // metadata: JSON.stringify(m.metadata),
    })),
  })
}

export function msgUpdateGroupMetadata({
  admin,
  metadata,
  groupId,
}: {
  admin: string
  groupId: string
  metadata: UIGroupMetadata
}) {
  return GroupMsgWithTypeUrl.updateGroupMetadata({
    admin,
    groupId: Long.fromString(groupId),
    metadata: JSON.stringify(metadata),
  })
}
