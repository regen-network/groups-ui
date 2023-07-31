import Long from 'long'
import { describe, expect, it } from 'vitest'

import { GroupInfoSDKType, UIGroup, UIGroupMetadata } from 'types'

import { toUIGroup } from 'api/group.utils'

// TODO(#128): move these to reusable stubs
const date = new Date(2022, 1, 1)
const dateTime = date.getTime()

const metadata: UIGroupMetadata = {
  name: 'bob',
  description: 'bob is a good guy',
  forumLink: 'https://forum.com',
}

const stubGroup: GroupInfoSDKType = {
  admin: 'cosmos106ljn6kds9vegaux0w4jnend97fdm50yec59vq',
  created_at: { nanos: 0, seconds: Long.fromNumber(dateTime) },
  id: Long.fromString('st123r'),
  metadata: JSON.stringify(metadata),
  total_weight: '2',
  version: Long.fromString('1'),
}

const stubUIGroup: UIGroup = {
  admin: 'cosmos106ljn6kds9vegaux0w4jnend97fdm50yec59vq',
  createdAt: date,
  id: Long.fromString('st123r'),
  metadata,
  totalWeight: '2',
  version: Long.fromString('1'),
}

// TODO(#128): valtio messes this up
describe.skip('Group Transforms', () => {
  it.skip('works on normal chain group', () => {
    expect(toUIGroup(stubGroup)).toEqual(stubUIGroup)
  })
})
