import type { Meta, StoryFn } from '@storybook/react'

import { Button } from '@/atoms'

import { NoItem } from '../no-item'

import { NoMemberIcon } from 'assets/tsx'

export default {
  title: 'Molecules/NoItem',
  component: NoItem,
} as Meta<typeof NoItem>

const Template: StoryFn<typeof NoItem> = () => (
  <NoItem
    icon={<NoMemberIcon width="100" height="100" />}
    header="No members"
    button={<Button>add members</Button>}
  />
)

export const Component = Template.bind({})
