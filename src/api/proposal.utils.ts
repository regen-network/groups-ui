import type {
  Any,
  ProposalAction,
  ProposalStakeFormValues,
  ProposalTextFormValues,
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

export function isStakeProposal(
  values: ProposalAction['values'],
): values is ProposalStakeFormValues {
  return 'stakeType' in values
}

function isTextProposal(
  values: ProposalAction['values'],
): values is ProposalTextFormValues {
  return !isStakeProposal(values) && 'text' in values
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
