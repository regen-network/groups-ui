import { cosmos } from '@haveanicedavid/regen-ts'

import type { Any } from 'types'

/** NOTE: Can't use the msgComposer here, as these messages will be nested into a proposal's `messages` field. Need to manually set `typUrl` and an encoded `value` */

export function msgStakingDelegate({
  delegatorAddress,
  validatorAddress,
  amount,
  denom,
}: {
  delegatorAddress: string
  validatorAddress: string
  amount: string
  denom: string
}): Any {
  const value = cosmos.staking.v1beta1.MsgDelegate.encode({
    delegatorAddress,
    validatorAddress,
    amount: { denom, amount },
  }).finish()
  return {
    value,
    typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
  }
}

export function msgStakingUndelegate({
  delegatorAddress,
  validatorAddress,
  amount,
  denom,
}: {
  delegatorAddress: string
  validatorAddress: string
  amount: string
  denom: string
}): Any {
  const value = cosmos.staking.v1beta1.MsgUndelegate.encode({
    delegatorAddress,
    validatorAddress,
    amount: {
      denom,
      amount,
    },
  }).finish()
  return {
    value,
    typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
  }
}

export function msgStakingRedelegate({
  delegatorAddress,
  validatorSrcAddress,
  validatorDstAddress,
  amount,
  denom,
}: {
  delegatorAddress: string
  validatorSrcAddress: string
  validatorDstAddress: string
  amount: string
  denom: string
}): Any {
  const value = cosmos.staking.v1beta1.MsgBeginRedelegate.encode({
    delegatorAddress,
    validatorSrcAddress,
    validatorDstAddress,
    amount: {
      amount,
      denom,
    },
  }).finish()
  return {
    value,
    typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
  }
}

export function msgStakingClaim({
  delegatorAddress,
  validatorAddress,
}: {
  delegatorAddress: string
  validatorAddress: string
}): Any {
  const value = cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward.encode({
    delegatorAddress,
    validatorAddress,
  }).finish()
  return {
    value,
    typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  }
}
