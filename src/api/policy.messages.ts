import { daysToDuration, secondsToDuration } from 'util/date'
import { throwError } from 'util/errors'
import { intToPercent } from 'util/helpers'

import { MsgWithTypeUrl, v1 } from './cosmosgroups'

export function updateDecisionPolicyMsg({
  admin,
  policyAddress,
  quorum,
  threshold,
  votingWindow,
}: {
  admin: string
  policyAddress: string
  votingWindow: string
  quorum?: string
  threshold?: string
}) {
  return MsgWithTypeUrl.updateGroupPolicyDecisionPolicy({
    admin,
    decision_policy: encodeDecisionPolicy({
      votingWindow,
      quorum,
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
  quorum,
}: {
  /** in days */
  votingWindow: string
  /** positive integer */
  threshold?: string
  /** percentage expressed as an integer, ie `51 == 51% / 0.51` */
  quorum?: string
}) {
  const windows = {
    min_execution_period: secondsToDuration(1),
    voting_period: daysToDuration(parseInt(votingWindow)),
  }
  const val = quorum && parseInt(quorum)
  if (val && typeof val === 'number' && val > 0) {
    return {
      type_url: '/cosmos.group.v1.PercentageDecisionPolicy',
      value: v1.PercentageDecisionPolicy.encode({
        percentage: intToPercent(val),
        windows,
      }).finish(),
    }
  }
  if (!threshold) throwError('Must provide threshold or quorum')
  return {
    type_url: '/cosmos.group.v1.ThresholdDecisionPolicy',
    value: v1.ThresholdDecisionPolicy.encode({
      threshold: threshold.toString(),
      windows,
    }).finish(),
  }
}
