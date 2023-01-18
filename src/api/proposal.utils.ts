import type {
  Any,
  ProposalAction,
  ProposalSDKType,
  ProposalStakeFormValues,
  ProposalTextFormValues,
  UIProposal,
} from 'types'
import { throwError } from 'util/errors'

import { msgTextProposal } from './proposal.messages'
import {
  msgStakingDelegate,
  msgStakingRedelegate,
  msgStakingUndelegate,
} from './staking.messages'
import { isClaimValues, isDelegateValues, isRedelegateValues } from './staking.utils'

type ProposalData = {
  denom: string
  groupPolicyAddress: string
  title: string
  description: string
}

export function proposalActionsToMsgs(
  actions: ProposalAction[],
  data: ProposalData,
): Any[] {
  return actions.map(({ values }) => {
    if (isStakeProposal(values)) {
      return stakeValuesToMsg(values, data) as unknown as Any // TODO
    }
    if (isTextProposal(values)) {
      return msgTextProposal({ title: data.title, description: data.description })
    }
    throwError(`Unknown proposal action: ${JSON.stringify(values, null, 2)}`)
  })
}

export function toUIProposal(sdkProposal: ProposalSDKType): UIProposal {
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
    messages: sdkProposal.messages.map((msg) => ({
      typeUrl: msg.type_url,
      value: msg.value,
    })),
    metadata: JSON.parse(sdkProposal.metadata),
    proposers: sdkProposal.proposers,
    // Identical enum - see above
    status: sdkProposal.status as unknown as UIProposal['status'],
    ...(!!final_tally_result && {
      abstainCount: final_tally_result.abstain_count,
      noCount: final_tally_result.no_count,
      noWithVetoCount: final_tally_result.no_with_veto_count,
      yesCount: final_tally_result.yes_count,
    }),
    submitTime: sdkProposal.submit_time,
    votingPeriodEnd: sdkProposal.voting_period_end,
  }
}

function isStakeProposal(
  values: ProposalAction['values'],
): values is ProposalStakeFormValues {
  return 'stakeType' in values
}

function isTextProposal(
  values: ProposalAction['values'],
): values is ProposalTextFormValues {
  return !isStakeProposal(values) && 'text' in values
}

function stakeValuesToMsg(values: ProposalStakeFormValues, data: ProposalData) {
  if (isDelegateValues(values)) {
    console.log('Delegate msg')
    const delegateInfo = {
      amount: values.amount,
      validatorAddress: values.validator,
      denom: data.denom,
      delegatorAddress: data.groupPolicyAddress, // TODO: should this be a different address?
    }
    return values.stakeType === 'delegate'
      ? msgStakingDelegate(delegateInfo)
      : msgStakingUndelegate(delegateInfo)
  }
  if (isRedelegateValues(values)) {
    console.log('redelegate msg')
    return msgStakingRedelegate({
      amount: values.amount,
      denom: data.denom,
      delegatorAddress: data.groupPolicyAddress,
      validatorDstAddress: values.toValidator,
      validatorSrcAddress: values.fromValidator,
    })
  }
  if (isClaimValues(values)) {
    console.warn('Not yet implemented! Cannot create claim message')
    // TODO: stakingClaimMsg currently only accepts arguments for delegator &
    // validator addresses - from UX standpoint though we should probably target
    // something like Keplr where it's just a simple "claim"
    // return stakingClaimMsg({})
  }
  throwError('Unknown stake type')
}
