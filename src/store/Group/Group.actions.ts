import { cosmos } from '@haveanicedavid/groups-ui-telescope'

import { type GroupFormValues } from 'models'
const { createGroup } = cosmos.group.v1.MessageComposer.withTypeUrl

/** Take form values and return a msg to be broadcast */
export function createGroupMsg({
  admin,
  members,
  name,
  description,
  forumLink,
  otherMetadata,
}: GroupFormValues) {
  return createGroup({
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
