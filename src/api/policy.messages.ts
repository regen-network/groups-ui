import Long from 'long'

import { GroupPolicyFormValues } from 'types'
import { daysToDuration, secondsToDuration } from 'util/date'
import { throwError } from 'util/errors'
import { clearEmptyStr, numToPercentStr } from 'util/helpers'

import { GroupMsgWithTypeUrl, groupV1 } from './cosmosgroups'

export function msgCreateGroupPolicy({
  groupId,
  admin,
  values: { percentage, threshold, policyType, votingWindow },
}: {
  groupId: string
  admin: string
  values: GroupPolicyFormValues
}) {
  return GroupMsgWithTypeUrl.createGroupPolicy({
    groupId: Long.fromString(groupId),
    metadata: '',
    admin,
    decisionPolicy: encodeDecisionPolicy({
      policyType,
      percentage: clearEmptyStr(percentage),
      threshold: clearEmptyStr(threshold),
      votingWindow: votingWindow,
    }),
  })
}

export function msgUpdateDecisionPolicy({
  admin,
  policyAddress,
  percentage,
  threshold,
  policyType,
  votingWindow,
}: {
  admin: string
  percentage?: number
  policyAddress: string
  policyType: GroupPolicyFormValues['policyType']
  threshold?: number
  votingWindow: number
}) {
  return GroupMsgWithTypeUrl.updateGroupPolicyDecisionPolicy({
    admin,
    decisionPolicy: encodeDecisionPolicy({
      percentage,
      policyType,
      threshold,
      votingWindow,
    }),
    groupPolicyAddress: policyAddress,
  })
}

/** @returns gogo `Any` shaped encoded decision policy: `ThresholdDecisionPolicy`
 * or `PercentageDecisionPolicy`. Can't explicitly type because of the way
 * msgCompoer expects values */
export function encodeDecisionPolicy({
  votingWindow,
  policyType,
  threshold,
  percentage,
}: {
  /** number of days expressed as an integer string */
  votingWindow: number
  /** positive integer string */
  threshold?: number
  /** percentage expressed as an integer string, ie `51` == 51% | '0.51'` */
  percentage?: number
  policyType: GroupPolicyFormValues['policyType']
}) {
  const windows = {
    minExecutionPeriod: secondsToDuration(1),
    votingPeriod: daysToDuration(votingWindow),
  }
  if (policyType === 'percentage') {
    if (!percentage) throwError('Must provide percentage value')
    return {
      typeUrl: '/cosmos.group.v1.PercentageDecisionPolicy',
      value: groupV1.PercentageDecisionPolicy.encode({
        percentage: numToPercentStr(percentage),
        windows,
      }).finish(),
    }
  } else if (policyType === 'threshold') {
    if (!threshold) throwError('Must provide threshold value')
    return {
      typeUrl: '/cosmos.group.v1.ThresholdDecisionPolicy',
      value: groupV1.ThresholdDecisionPolicy.encode({
        threshold: threshold.toString(),
        windows,
      }).finish(),
    }
  } else {
    throwError('Invalid policy type: ' + policyType)
  }
}
