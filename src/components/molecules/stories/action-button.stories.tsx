import type { Meta, StoryFn } from '@storybook/react'

import { ActionButton } from '../action-button'

import { FileTextIcon } from 'assets/tsx'

export default {
  title: 'Molecules/ActionButton',
  component: ActionButton,
} as Meta<typeof ActionButton>

const Template: StoryFn<typeof ActionButton> = (args) => <ActionButton {...args} />

export const Component = Template.bind({})
Component.args = {
  label: 'Text proposal',
  icon: FileTextIcon,
  tooltipText: 'Tooltip text',
  onClick: () => void null,
}
