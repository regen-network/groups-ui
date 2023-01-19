import type { Meta, StoryFn } from '@storybook/react'

import { IconButton } from '../chakra-components'

import { GroupsIcon } from 'assets/tsx'

export default {
  title: 'Atoms/IconButton',
  component: IconButton,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: 'radio',
    },
    color: {
      options: ['primary', 'secondary'],
      control: 'radio',
    },
  },
} as Meta<typeof IconButton>

const Template: StoryFn<typeof IconButton> = (args) => (
  <IconButton {...args}>
    <GroupsIcon />
  </IconButton>
)

export const Component = Template.bind({})
Component.args = {}
