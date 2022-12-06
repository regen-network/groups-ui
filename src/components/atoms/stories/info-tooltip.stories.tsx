import type { Meta, StoryFn } from '@storybook/react'

import { Box } from '../chakra'
import { InfoTooltip } from '../info-tooltip'

export default {
  title: 'Atoms/InfoTooltip',
  component: InfoTooltip,
} as Meta<typeof InfoTooltip>

const Template: StoryFn<typeof InfoTooltip> = (args) => (
  <Box p={10}>
    <InfoTooltip {...args} />
  </Box>
)

export const Component = Template.bind({})
Component.args = { label: 'Label text within tooltip' }
