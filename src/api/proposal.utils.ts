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

// copy-pasted from the SDK `ProposalStatus` enum - vite doesn't handle enums well
export const ProposalStatus = {
  /** PROPOSAL_STATUS_UNSPECIFIED - An empty value is invalid and not allowed. */
  PROPOSAL_STATUS_UNSPECIFIED: 0,
  /** PROPOSAL_STATUS_SUBMITTED - Initial status of a proposal when submitted. */
  PROPOSAL_STATUS_SUBMITTED: 1,
  /**
   * PROPOSAL_STATUS_ACCEPTED - Final status of a proposal when the final tally is done and the outcome
   * passes the group policy's decision policy.
   */
  PROPOSAL_STATUS_ACCEPTED: 2,
  /**
   * PROPOSAL_STATUS_REJECTED - Final status of a proposal when the final tally is done and the outcome
   * is rejected by the group policy's decision policy.
   */
  PROPOSAL_STATUS_REJECTED: 3,
  /**
   * PROPOSAL_STATUS_ABORTED - Final status of a proposal when the group policy is modified before the
   * final tally.
   */
  PROPOSAL_STATUS_ABORTED: 4,
  /**
   * PROPOSAL_STATUS_WITHDRAWN - A proposal can be withdrawn before the voting start time by the owner.
   * When this happens the final status is Withdrawn.
   */
  PROPOSAL_STATUS_WITHDRAWN: 5,
  UNRECOGNIZED: -1,
} as const
