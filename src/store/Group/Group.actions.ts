import type { DeliverTxResponse } from '@cosmjs/stargate'
// import { Tendermint34Client } from '@cosmjs/tendermint-rpc'
import { cosmos /* , tendermint */ } from '@haveanicedavid/groups-ui-telescope'
import type { PageRequest as IPageRequest } from '@haveanicedavid/groups-ui-telescope/types/proto/cosmos/base/query/v1beta1/pagination'

// import { PageRequest } from '@haveanicedavid/groups-ui-telescope/types/proto/cosmos/base/query/v1beta1/pagination'
// import { PageRequest } from '@haveanicedavid/groups-ui-telescope/types/proto/cosmos/base/query/v1beta1/pagination'
import { type GroupFormValues } from 'models'
import { Group, Wallet } from 'store'
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
  if (!Group.queryService || !Wallet.account) throwError('Wallet not initialized')
  // const pagination: Partial<IPageRequest> = {}
  try {
    // const data = await Group.queryService.groupsByMember({
    //   address: Wallet.account.address,
    //   pagination,
    //   // pagination: PageRequest.fromPartial({
    //   //   offset: 0,
    //   //   limit: 100,
    //   // }),
    // })
    // const client = Tendermint34Client
    // const data = await cosmos.group.v1.q
    // cosmos.ClientFactory.createRPCQueryClient({ rpc: { request('', method, data)}})
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
