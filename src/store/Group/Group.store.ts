import { LCDQueryClient } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/query.lcd'
// import { QueryClientImpl } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/query.rpc.query'
import { proxy } from 'valtio'

type GroupsStore = {
  query?: LCDQueryClient
}

export const Group = proxy<GroupsStore>({})
