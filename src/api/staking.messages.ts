import { StakingMsgWithTypeUrl } from './cosmosgroups'

export function stakingDelegateMsg({
  delegatorAddress,
  validatorAddress,
  amount,
  denom,
}: {
  delegatorAddress: string
  validatorAddress: string
  amount: string
  denom: string
}) {
  return StakingMsgWithTypeUrl.delegate({
    delegatorAddress,
    validatorAddress,
    amount: {
      denom,
      amount,
    },
  })
}
