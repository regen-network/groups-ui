import Long from 'long'
import { describe, expect, it } from 'vitest'

import { ChainGroup, ChainGroupRes, UIGroup, UIGroupMetadata } from 'models'
import { groupToUIGroup } from 'store/Group/Group.transforms'

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
  createdAt: date,
  id: Long.fromString('st123r'),
  metadata: JSON.stringify(metadata),
  totalWeight: '2',
  version: Long.fromString('1'),
}

const stubGroupRes: ChainGroupRes = {
  admin: 'cosmos106ljn6kds9vegaux0w4jnend97fdm50yec59vq',
  created_at: dateStr,
  id: Long.fromString('st123r'),
  metadata: JSON.stringify(metadata),
  total_weight: '2',
  version: Long.fromString('1'),
}

const stubUIGroup: UIGroup = {
  admin: 'cosmos106ljn6kds9vegaux0w4jnend97fdm50yec59vq',
  createdAt: dateStr,
  id: Long.fromString('st123r'),
  metadata,
  totalWeight: '2',
  version: Long.fromString('1'),
}

describe('Group Transforms', () => {
  it('transform group res to UI group', () => {
    expect(groupToUIGroup(stubGroupRes)).toEqual(stubUIGroup)
  })

  it('works on normal chain group', () => {
    expect(groupToUIGroup(stubGroup)).toEqual(stubUIGroup)
  })
})
