import { ComponentMeta, ComponentStory } from '@storybook/react'

import { GroupsIcon } from '@/atoms'

import { IconButton } from '../MuiReExports'

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
} as ComponentMeta<typeof IconButton>

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args}>
    <GroupsIcon />
  </IconButton>
)

export const Component = Template.bind({})
Component.args = {}
