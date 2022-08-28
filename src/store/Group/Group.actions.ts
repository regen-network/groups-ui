import type { DeliverTxResponse } from '@cosmjs/stargate'
import { cosmos } from '@haveanicedavid/cosmos-groups-ts'

import { type GroupFormValues } from 'models'
import { Group, Wallet } from 'store'
import { throwError } from 'util/errors'

export async function createGroup(values: GroupFormValues): Promise<DeliverTxResponse> {
  const { account, signingClient, fee } = Wallet
  if (!account || !signingClient || !fee) throwError('Wallet not initialized')
  try {
    const msg = _createGroupMsg(values)
    const data = await signingClient.signAndBroadcast(account.address, [msg], fee)
    console.log('data in createGroup:>> ', data)
    return data
  } catch (error) {
    throwError(error)
  }
}

export async function fetchGroupsByMember(address?: string) {
  if (!Group.query || !address) throwError('Wallet not initialized')
  try {
    const { groups } = await Group.query.groupsByMember({
      address,
    })
    return groups
  } catch (error) {
    throwError(error)
  }
}

export async function fetchGroupsByAdmin(admin?: string) {
  if (!Group.query || !admin) throwError('Wallet not initialized')
  try {
    const { groups } = await Group.query.groupsByAdmin({
      admin,
    })
    return groups
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
