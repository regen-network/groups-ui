import type { DeliverTxResponse } from '@cosmjs/stargate'
import { cosmos } from '@haveanicedavid/groups-ui-telescope'

import { type GroupFormValues } from 'models'
import { Wallet } from 'store'
import { throwError } from 'util/errors'

export async function createGroup(values: GroupFormValues): Promise<DeliverTxResponse> {
  const { account, signingClient, fee } = Wallet
  if (!account || !signingClient || !fee) throwError('Wallet not initialized')
  try {
    const msg = _createGroupMsg(values)
    const data = await signingClient.signAndBroadcast(account.address, [msg], fee)
    return data
  } catch (error) {
    throwError(error)
  }
}

export async function fetchGroups(): Promise<any[]> {
  const { signingClient } = Wallet
  if (!signingClient) throwError('Wallet not initialized')
  try {
    // const data = await cosmos.group.v1.q
    cosmos.ClientFactory.createRPCQueryClient
    // return data
    return []
  } catch (error) {
    throwError(error)
  }
}

/** Take form values and return a msg to be broadcast */
function _createGroupMsg({
  admin,
  members,
  name,
  description,
  forumLink,
  otherMetadata,
}: GroupFormValues) {
  return cosmos.group.v1.MessageComposer.withTypeUrl.createGroup({
    admin,
    metadata: JSON.stringify({
      name,
      description,
      forumLink,
      other: otherMetadata,
    }),
    members: members.map((m) => ({
      address: m.address,
      weight: m.weight.toString(),
      metadata: JSON.stringify(m.metadata),
    })),
  })
}
