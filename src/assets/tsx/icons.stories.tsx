import { ComponentMeta, ComponentStory } from '@storybook/react'

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
} as ComponentMeta<typeof GroupsIcon>

const Template: ComponentStory<typeof GroupsIcon> = () => <GroupsIcon />

export const Component = Template.bind({})
Component.args = {}
