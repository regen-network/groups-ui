import { useParams } from 'react-router-dom'

import type {
  GroupFormValues,
  GroupPolicyFormValues,
  GroupWithPolicyFormValues,
} from 'types'
import { throwError, toErrorWithMessage } from 'util/errors'
import { TOAST_DEFAULTS } from 'util/style.constants'

import { signAndBroadcast } from 'store'
import { updateGroupMetadataMsg } from 'api/group.messages'
import { isPercentagePolicy, isThresholdPolicy } from 'api/policy.helpers'
import { useToast } from 'hooks/chakra'
import { useGroup, useGroupMembers, useGroupPolicies } from 'hooks/use-query'

import { Loading } from '@/molecules'
import GroupTemplate from '@/templates/group-template'

export default function GroupEdit() {
  const toast = useToast()
  const { groupId } = useParams()
  const { data: group } = useGroup(groupId)
  const { data: members } = useGroupMembers(groupId)
  const { data: policies } = useGroupPolicies(groupId)

  const [policy] = policies ?? []

  if (!group || !members || !policy) return <Loading />

  const initialGroupValues: GroupFormValues = {
    admin: policy.admin,
    members: members.map(({ member }) => ({
      address: member.address,
      weight: +member.weight,
      metadata: member.metadata,
    })),
    name: group.metadata.name,
    policyAsAdmin: policy.address === group.admin ? 'true' : 'false',
    description: group.metadata.description,
    forumLink: group.metadata.forumLink,
    otherMetadata: group.metadata.other,
  }

  console.log('wowowow :>> ', policy.decision_policy.windows)

  const initialPolicyValues: GroupPolicyFormValues = {
    threshold: isThresholdPolicy(policy.decision_policy)
      ? parseInt(policy.decision_policy.threshold)
      : 0,
    votingWindow: policy.decision_policy.windows.voting_period, // TODO
    quorum: isPercentagePolicy(policy.decision_policy)
      ? parseInt(policy.decision_policy.percentage)
      : undefined,
  }

  const initialValues = {
    // combined for ease of iterating over
    ...initialGroupValues,
    ...initialPolicyValues,
  }

  async function handleSave(values: GroupWithPolicyFormValues) {
    if (!group || !group.admin || !groupId) throwError('Uh oh') // TODO
    const msgs = []
    const hasUpdatedMetadata = false
    for (const _prop in values) {
      const prop = _prop as keyof GroupWithPolicyFormValues // ts hack
      if (initialValues[prop] !== values[prop]) {
        // update metadata
        if (
          ['name', 'description', 'forumLink', 'otherMetadata'].includes(prop) &&
          !hasUpdatedMetadata
        ) {
          msgs.push(
            updateGroupMetadataMsg({
              groupId,
              admin: group.admin,
              metadata: {
                ...group.metadata,
                name: values.name,
                description: values.description,
                forumLink: values.forumLink,
                updatedAt: Date.now().toString(),
                other: values.otherMetadata,
              },
            }),
          )
        }
        if (prop === 'admin') {
          // TODO check if current admin, block in UI otherwise? maybe give disclosure
          // msg/updateGroupAdmin
        }
        if (prop === 'members') {
          // TODO msg/updateGroupMembers
        }
        if (prop === 'votingWindow' || prop === 'threshold' || prop === 'quorum') {
          // TODO Msg/UpdateGroupPolicyDecisionPolicy
        }
      }
    }
    try {
      // TODO: compare initialValues with values, create messages for updates
      const { transactionHash } = await signAndBroadcast(msgs)
      console.log('transactionHash :>> ', transactionHash)
    } catch (err) {
      reportError(err)
      const msg = toErrorWithMessage(err).message
      toast({
        ...TOAST_DEFAULTS,
        title: 'Group creation failed',
        description: msg,
        status: 'error',
        duration: 9000,
      })
    }
  }

  return (
    <GroupTemplate
      initialGroupFormValues={initialGroupValues}
      initialPolicyFormValues={initialPolicyValues}
      text={{
        submitBtn: 'Redeploy',
        finished: 'You have successfully edited your group.',
      }}
      steps={['Edit Group', 'Edit Group Policy', 'Finished editing']}
      submit={handleSave}
    />
  )
}
