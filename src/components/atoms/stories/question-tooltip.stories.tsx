import type { Meta, StoryFn } from '@storybook/react'

import { Box } from '../chakra-components'
import { QuestionTooltip } from '../question-tooltip'

export default {
  title: 'Atoms/QuestionTooltip',
  component: QuestionTooltip,
} as Meta<typeof QuestionTooltip>

const Template: StoryFn<typeof QuestionTooltip> = (args) => (
  <Box p={10}>
    <QuestionTooltip {...args} />
  </Box>
)

export const Component = Template.bind({})
Component.args = { label: 'Label text within tooltip' }
