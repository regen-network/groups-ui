import { Meta, StoryFn } from '@storybook/react'

import { GroupsIcon } from './groups-icon'

export default {
  title: 'Icons/Groups Icon',
  component: GroupsIcon,
  argTypes: {
    color: {
      options: ['primary', 'secondary'],
      control: 'radio',
    },
  },
} as Meta<typeof GroupsIcon>

const Template: StoryFn<typeof GroupsIcon> = () => <GroupsIcon />

export const Component = Template.bind({})
Component.args = {}
