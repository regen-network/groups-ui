import { Meta, StoryFn } from '@storybook/react'

import { AddActionButton } from '../add-action-button'

export default {
  title: 'Atoms/NewActionButton',
  component: AddActionButton,
  argTypes: {
    onClick: { control: false },
  },
} as Meta<typeof AddActionButton>

const Template: StoryFn<typeof AddActionButton> = (args) => <AddActionButton {...args} />

export const Component = Template.bind({})
Component.args = {}
