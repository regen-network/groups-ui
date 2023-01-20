import type { Meta, StoryFn } from '@storybook/react'
import { mockProposal } from 'tests/mocks'

import { ReadyToExecuteTable } from '../ready-to-execute-table'

export default {
  title: 'Organisms/ReadyToExecuteTable',
  component: ReadyToExecuteTable,
} as Meta<typeof ReadyToExecuteTable>

const Template: StoryFn<typeof ReadyToExecuteTable> = (args) => {
  return <ReadyToExecuteTable {...args} />
}

const proposals = [1, 2, 3, 4].map((i) => mockProposal(i))
export const Component = Template.bind({})
Component.args = {
  proposals,
}
