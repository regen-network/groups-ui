import type { LCDQueryClient } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/query.lcd'
import { proxy } from 'valtio'

type GroupsStore = {
  query?: LCDQueryClient
}

export const Group = proxy<GroupsStore>({})
