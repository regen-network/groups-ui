import type {
  Any,
  ProposalAction,
  ProposalSDKType,
  ProposalSendFormValues,
  ProposalStakeFormValues,
  UIProposal,
  Vote,
  VoteSDKType,
} from 'types'
import { toDate } from 'util/date'
import { throwError } from 'util/errors'
import { getProposalMetadata } from 'util/validation'

import { msgSend } from './bank.messages'
import {
  msgStakingDelegate,
  msgStakingRedelegate,
  msgStakingUndelegate,
} from './staking.messages'
import {
  isClaimValues,
  isDelegateValues,
  isRedelegateValues,
  isUndelegateValues,
} from './staking.utils'

type ProposalData = {
  denom: string
  groupPolicyAddress: string
  title: string
  summary: string
}

export function proposalActionsToMsgs(
  actions: ProposalAction[],
  data: ProposalData,
): Any[] {
  return actions.map(({ values }) => {
    if (isSendProposal(values)) {
      return sendValuesToMsg(values, data) as unknown as Any // TODO
    }
    if (isStakeProposal(values)) {
      return stakeValuesToMsg(values, data) as unknown as Any // TODO
    }
    throwError(`Unknown proposal action: ${JSON.stringify(values, null, 2)}`)
  })
}

export async function toUIProposal(sdkProposal: ProposalSDKType): Promise<UIProposal> {
  const { final_tally_result } = sdkProposal
  return {
    // executorResult is an enum - currently identical to SDK versions so this
    // should be fine
    executorResult:
      sdkProposal.executor_result as unknown as UIProposal['executorResult'],
    groupPolicyAddress: sdkProposal.group_policy_address,
    groupPolicyVersion: sdkProposal.group_policy_version,
    groupVersion: sdkProposal.group_version,
    id: sdkProposal.id,
    // TODO: https://github.com/regen-network/regen-js/issues/71
    messages: sdkProposal.messages.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (msg: any) =>
        ({
          typeUrl: msg['@type'],
          value: msg,
        } as Any),
    ),
    metadata: await getProposalMetadata(sdkProposal.metadata, {
      title: `Proposal #${sdkProposal.id}`,
    }),
    proposers: sdkProposal.proposers,
    // Identical enum - see above
    status: sdkProposal.status as unknown as UIProposal['status'],
    ...(!!final_tally_result && {
      finalTallyResult: {
        abstainCount: final_tally_result.abstain_count,
        noCount: final_tally_result.no_count,
        noWithVetoCount: final_tally_result.no_with_veto_count,
        yesCount: final_tally_result.yes_count,
      },
    }),
    submitTime: sdkProposal.submit_time ? toDate(sdkProposal.submit_time) : undefined,
    votingPeriodEnd: sdkProposal.voting_period_end
      ? toDate(sdkProposal.voting_period_end)
      : undefined,
  }
}

export function toUIVote({
  metadata,
  option,
  proposal_id,
  voter,
  submit_time,
}: VoteSDKType): Vote {
  return {
    metadata,
    option: option as unknown as Vote['option'],
    proposalId: proposal_id,
    voter,
    submitTime: submit_time,
  }
}

function isSendProposal(
  values: ProposalAction['values'],
): values is ProposalSendFormValues {
  return 'sendType' in values
}

function sendValuesToMsg(values: ProposalSendFormValues, data: ProposalData) {
  const sendInfo = {
    fromAddress: data.groupPolicyAddress,
    toAddress: values.toAddress,
    amount: values.amount,
    denom: values.denom,
  }
  return msgSend(sendInfo)
}

function isStakeProposal(
  values: ProposalAction['values'],
): values is ProposalStakeFormValues {
  return 'stakeType' in values
}

function stakeValuesToMsg(values: ProposalStakeFormValues, data: ProposalData) {
  if (isDelegateValues(values)) {
    return msgStakingDelegate({
      amount: values.amount,
      denom: values.denom,
      validatorAddress: values.validator,
      delegatorAddress: data.groupPolicyAddress,
    })
  }
  if (isUndelegateValues(values)) {
    return msgStakingUndelegate({
      amount: values.amount,
      denom: values.denom,
      validatorAddress: values.validator,
      delegatorAddress: data.groupPolicyAddress,
    })
  }
  if (isRedelegateValues(values)) {
    return msgStakingRedelegate({
      amount: values.amount,
      denom: values.denom,
      delegatorAddress: data.groupPolicyAddress,
      validatorDstAddress: values.toValidator,
      validatorSrcAddress: values.fromValidator,
    })
  }
  if (isClaimValues(values)) {
    console.warn('Not yet implemented! Cannot create claim message')
    // TODO(#79): stakingClaimMsg currently only accepts arguments for delegator &
    // validator addresses - from UX standpoint though we should probably target
    // something like Keplr where it's just a simple "claim"
    // return stakingClaimMsg({})
  }
  throwError('Unknown stake type')
}
