import { daysToDuration, secondsToDuration } from 'util/date'
import { throwError } from 'util/errors'
import { numToPercentStr } from 'util/helpers'

import { MsgWithTypeUrl, v1 } from './cosmosgroups'

export function updateDecisionPolicyMsg({
  admin,
  policyAddress,
  percentage,
  threshold,
  votingWindow,
}: {
  admin: string
  policyAddress: string
  votingWindow: number
  percentage?: number
  threshold?: number
}) {
  return MsgWithTypeUrl.updateGroupPolicyDecisionPolicy({
    admin,
    decision_policy: encodeDecisionPolicy({
      votingWindow,
      percentage,
      threshold,
    }),
    group_policy_address: policyAddress,
  })
}

/** @returns gogo `Any` shaped encoded decision policy: `ThresholdDecisionPolicy`
 * or `PercentageDecisionPolicy`. Can't explicitly type because of the way
 * msgCompoer expects values */
export function encodeDecisionPolicy({
  votingWindow,
  threshold,
  percentage,
}: {
  /** number of days expressed as an integer string */
  votingWindow: number
  /** positive integer string */
  threshold?: number
  /** percentage expressed as an integer string, ie `51` == 51% | '0.51'` */
  percentage?: number
}) {
  const windows = {
    min_execution_period: secondsToDuration(1),
    voting_period: daysToDuration(votingWindow),
  }
  if (percentage) {
    return {
      type_url: '/cosmos.group.v1.PercentageDecisionPolicy',
      value: v1.PercentageDecisionPolicy.encode({
        percentage: numToPercentStr(percentage),
        windows,
      }).finish(),
    }
  }
  if (!threshold) throwError('Must provide threshold or percentage')
  return {
    type_url: '/cosmos.group.v1.ThresholdDecisionPolicy',
    value: v1.ThresholdDecisionPolicy.encode({
      threshold: threshold.toString(),
      windows,
    }).finish(),
  }
}
