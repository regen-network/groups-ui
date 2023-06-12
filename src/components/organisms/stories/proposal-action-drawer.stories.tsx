import type { Meta, StoryFn } from '@storybook/react'

import { ProposalActionDrawer } from '../proposal-action-drawer'

export default {
  title: 'Organisms/ProposalActionDrawer',
  component: ProposalActionDrawer,
  argTypes: {
    isOpen: {
      type: 'boolean',
    },
  },
} as Meta<typeof ProposalActionDrawer>

const handle = () => void null

const Template: StoryFn<typeof ProposalActionDrawer> = (args) => {
  return <ProposalActionDrawer {...args} onClose={handle} onActionSelect={handle} />
}

export const Component = Template.bind({})
Component.args = {}
