import { cosmosgroups, GroupWithPolicyFormValues } from 'models'
import { daysToDuration, secondsToDuration } from 'util/date'

export function createGroupWithPolicyMsg({
  admin,
  description,
  forumLink,
  members,
  name,
  otherMetadata,
  policyAsAdmin,
  quorum,
  threshold: _threshold,
  votingWindow,
}: GroupWithPolicyFormValues) {
  const groupMembers = members.map((m) => ({
    address: m.address,
    weight: m.weight.toString(),
    metadata: JSON.stringify(m.metadata),
  }))
  const threshold = `${_threshold / 100}`
  let decision_policy
  const windows = {
    min_execution_period: secondsToDuration(1),
    voting_period: daysToDuration(votingWindow),
  }

  if (quorum) {
    decision_policy = {
      type_url: '/cosmos.group.v1.PercentageDecisionPolicy',
      value: cosmosgroups.PercentageDecisionPolicy.encode({
        percentage: `${quorum / 100}`,
        windows,
      }).finish(),
    }
  } else {
    decision_policy = {
      type_url: '/cosmos.group.v1.ThresholdDecisionPolicy',
      value: cosmosgroups.ThresholdDecisionPolicy.encode({
        threshold,
        windows,
      }).finish(),
    }
  }

  return cosmosgroups.MessageComposer.withTypeUrl.createGroupWithPolicy({
    admin,
    decision_policy,
    group_policy_metadata: '',
    group_policy_as_admin: policyAsAdmin === 'true',
    group_metadata: JSON.stringify({
      name,
      description,
      forumLink,
      updatedAt: new Date().toString(),
      other: otherMetadata,
    }),
    members: groupMembers,
  })
}
