import { cosmos } from '@regen-network/api'

import type { Any } from 'types'

/** NOTE: Can't use the msgComposer here, as these messages will be nested into a proposal's `messages` field. Need to manually set `typUrl` and an encoded `value` */

export function msgSend({
  fromAddress,
  toAddress,
  denom,
  amount,
}: {
  fromAddress: string
  toAddress: string
  denom: string
  amount: string
}): Any {
  const value = cosmos.bank.v1beta1.MsgSend.encode({
    fromAddress,
    toAddress,
    amount: [{ denom, amount }], // TODO(#19): support multiple coins?
  }).finish()
  return {
    typeUrl: '/cosmos.bank.v1beta1.MsgSend',
    value,
  }
}
