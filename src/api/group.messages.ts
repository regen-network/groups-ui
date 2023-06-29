import { cosmos } from '@regen-network/api'

import type { GroupWithPolicyFormValues } from 'types'
import { clearEmptyStr } from 'util/helpers'

import { GroupMsgWithTypeUrl } from './cosmosgroups'
import { MetadataMsgParams, toMetadataMsgValue } from './group.utils'
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

export function msgUpdateGroupMetadata(params: MetadataMsgParams) {
  return GroupMsgWithTypeUrl.updateGroupMetadata(toMetadataMsgValue(params))
}

export function msgUpdateGroupMetadataProposal(params: MetadataMsgParams) {
  const value = cosmos.group.v1.MsgUpdateGroupMetadata.encode(
    toMetadataMsgValue(params),
  ).finish()
  return {
    value,
    typeUrl: '/cosmos.group.v1.MsgUpdateGroupMetadata',
  }
}
