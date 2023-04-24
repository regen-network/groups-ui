import type { Meta, StoryFn } from '@storybook/react'

import { Heading, Stack, Text } from '@/atoms'

import { RadioBox } from '../radio-box'

export default {
  title: 'Atoms/Radio Box',
  component: RadioBox,
  argTypes: {
    selected: {
      type: 'boolean',
    },
    description: {
      type: 'string',
    },
  },
} as Meta<typeof RadioBox>

const Template: StoryFn<typeof RadioBox> = (args) => <RadioBox {...args} />

export const Component = Template.bind({})
Component.args = { label: 'Radio Box', selected: false }

export const WithChildren = Template.bind({})
WithChildren.args = {
  ...Component.args,
  selected: true,
  children: (
    <Stack>
      <Heading>heading</Heading>
      <Text>Text under the heading, maybe a description or just some random words</Text>
    </Stack>
  ),
}
