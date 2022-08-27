import type { MemberFormValues } from './Member.model'

/** @see @haveanicedavid/groups-ui-telescope/types/proto/cosmos/group/v1/types */
export type GroupFormValues = {
  admin: string
  description?: string
  forumLink?: string
  members: MemberFormValues[]
  name: string
  otherMetadata?: string
}

export const defaultGroupFormValues: GroupFormValues = {
  admin: '',
  name: '',
  members: [],
}
