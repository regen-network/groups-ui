import { proxy } from 'valtio'

type GroupsStore = {
  all: any[]
}

export const wallet = proxy<GroupsStore>({
  all: [],
})
