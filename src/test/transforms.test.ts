import Long from 'long'
import { describe, expect, it } from 'vitest'

import { ChainGroup, UIGroup, UIGroupMetadata } from 'models'

import { toUIGroup } from 'store/group/group.transforms'

// TODO: move these to reusable stubs
const date = new Date(2022, 1, 1)
const dateStr = date.toISOString()

const metadata: UIGroupMetadata = {
  name: 'bob',
  updatedAt: dateStr,
  description: 'bob is a good guy',
  forumLink: 'https://forum.com',
}

const stubGroup: ChainGroup = {
  admin: 'cosmos106ljn6kds9vegaux0w4jnend97fdm50yec59vq',
  created_at: date,
  id: Long.fromString('st123r'),
  metadata: JSON.stringify(metadata),
  total_weight: '2',
  version: Long.fromString('1'),
}

const stubUIGroup: UIGroup = {
  admin: 'cosmos106ljn6kds9vegaux0w4jnend97fdm50yec59vq',
  created_at: date,
  id: Long.fromString('st123r'),
  metadata,
  total_weight: '2',
  version: Long.fromString('1'),
}

describe('Group Transforms', () => {
  it('works on normal chain group', () => {
    expect(toUIGroup(stubGroup)).toEqual(stubUIGroup)
  })
})
