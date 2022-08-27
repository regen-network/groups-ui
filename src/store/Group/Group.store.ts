import { QueryClientImpl } from '@haveanicedavid/groups-ui-telescope/types/proto/cosmos/group/v1/query.rpc.query'
import { proxy } from 'valtio'

type GroupsStore = {
  queryService?: QueryClientImpl
}

export const Group = proxy<GroupsStore>({})
