import type { Meta, StoryFn } from '@storybook/react'

import { VoteOption } from 'util/enums'

import { SimpleGrid } from '@/atoms'

import { VoteButtons } from '../vote-buttons'

export default {
  title: 'Molecules/VoteButtons',
  component: VoteButtons,
  argTypes: {
    onVote: {
      type: 'function',
    },
    userVote: {
      control: 'radio',
      options: [
        undefined,
        VoteOption.VOTE_OPTION_NO,
        VoteOption.VOTE_OPTION_YES,
        VoteOption.VOTE_OPTION_ABSTAIN,
        VoteOption.VOTE_OPTION_NO_WITH_VETO,
      ],
    },
  },
} as Meta<typeof VoteButtons>

const Template: StoryFn<typeof VoteButtons> = (args) => {
  return (
    <SimpleGrid columns={2} gap={3} columnGap={4}>
      <VoteButtons {...args} />
    </SimpleGrid>
  )
}

export const Component = Template.bind({})
Component.args = {}

export const WithVote = Template.bind({})
WithVote.args = {
  userVote: VoteOption.VOTE_OPTION_YES,
}
