import type {
  MsgCreateGroupPolicyEncoded,
  MsgUpdateGroupPolicyDecisionPolicyEncoded,
} from '@regen-network/api/types/codegen/cosmos/group/v1/tx'
import Long from 'long'

import { GroupPolicyFormValues } from 'types'
import { daysToDuration, secondsToDuration } from 'util/date'
import { throwError } from 'util/errors'
import { clearEmptyStr, numToPercentStr } from 'util/helpers'

import { groupV1 } from './cosmosgroups'

export interface CreateGroupPolicyValues extends GroupPolicyFormValues {
  groupId: string
  admin: string
}

export function msgCreateGroupPolicy({
  groupId,
  admin,
  percentage,
  threshold,
  policyType,
  votingWindow,
}: CreateGroupPolicyValues) {
  // NOTE: We use the encoded msg type to support amino signing with nested types.
  // See https://github.com/osmosis-labs/telescope/issues/281
  const encodedMsg: MsgCreateGroupPolicyEncoded = {
    admin,
    groupId: Long.fromString(groupId),
    metadata: '',
    decisionPolicy: encodeDecisionPolicy({
      policyType,
      percentage: clearEmptyStr(percentage),
      threshold: clearEmptyStr(threshold),
      votingWindow: votingWindow,
    }),
  }

  return {
    typeUrl: '/cosmos.group.v1.MsgCreateGroupPolicy',
    value: encodedMsg,
  }
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
  // NOTE: We use the encoded msg type to support amino signing with nested types.
  // See https://github.com/osmosis-labs/telescope/issues/281
  const encodedMsg: MsgUpdateGroupPolicyDecisionPolicyEncoded = {
    admin,
    decisionPolicy: encodeDecisionPolicy({
      percentage,
      policyType,
      threshold,
      votingWindow,
    }),
    groupPolicyAddress: policyAddress,
  }

  return {
    typeUrl: '/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy',
    value: encodedMsg,
  }
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
    // NOTE: We use the encoded msg type to support amino signing with nested types.
    // See https://github.com/osmosis-labs/telescope/issues/281
    return groupV1.PercentageDecisionPolicy.toProtoMsg({
      percentage: numToPercentStr(percentage),
      windows,
    })
  } else if (policyType === 'threshold') {
    if (!threshold) throwError('Must provide threshold value')
    // NOTE: We use the encoded msg type to support amino signing with nested types.
    // See https://github.com/osmosis-labs/telescope/issues/281
    return groupV1.ThresholdDecisionPolicy.toProtoMsg({
      threshold: threshold.toString(),
      windows,
    })
  } else {
    throwError('Invalid policy type: ' + policyType)
  }
}
