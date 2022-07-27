import { ComponentMeta, ComponentStory } from '@storybook/react'

import { GroupsIcon } from '@/atoms'

import { IconButton } from '../IconButton'

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

export const Base = Template.bind({})
Base.args = {}
