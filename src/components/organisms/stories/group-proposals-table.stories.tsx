import type { Meta, StoryFn } from '@storybook/react'
import { mockProposal } from 'tests/mocks'

import { ProposalStatus } from 'api/proposal.utils'

import { GroupProposalsTable } from '../group-proposals-table'

export default {
  title: 'Organisms/GroupProposalTable',
  component: GroupProposalsTable,
  argTypes: {
    onExecute: { type: 'function' },
  },
} as Meta<typeof GroupProposalsTable>

const Template: StoryFn<typeof GroupProposalsTable> = (args) => {
  return <GroupProposalsTable {...args} />
}

const nums = [1, 2, 3, 4]
const accepted = nums.map((i) => mockProposal(i, ProposalStatus.PROPOSAL_STATUS_ACCEPTED))
const submitted = [5, 6].map((i) =>
  mockProposal(i, ProposalStatus.PROPOSAL_STATUS_SUBMITTED),
)

const combined = [
  mockProposal(7, ProposalStatus.PROPOSAL_STATUS_ABORTED),
  mockProposal(8, ProposalStatus.PROPOSAL_STATUS_SUBMITTED),
  mockProposal(9, ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED),
  mockProposal(10, ProposalStatus.PROPOSAL_STATUS_WITHDRAWN),
  mockProposal(11, ProposalStatus.UNRECOGNIZED),
  mockProposal(12, ProposalStatus.PROPOSAL_STATUS_ACCEPTED),
  mockProposal(13, ProposalStatus.PROPOSAL_STATUS_REJECTED),
]

export const Component = Template.bind({})
Component.args = {
  proposals: accepted,
  title: 'Ready to execute',
}

export const Submitted = Template.bind({})
Submitted.args = {
  proposals: submitted,
  title: 'Rejected',
}

export const Combined = Template.bind({})
Combined.args = {
  proposals: combined,
  title: 'Combined',
}
