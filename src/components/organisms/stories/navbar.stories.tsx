import type { Meta, StoryFn } from '@storybook/react'

import { Navbar } from '../navbar'

export default {
  title: 'Organisms/Navbar',
  component: Navbar,
  argTypes: {},
} as Meta<typeof Navbar>

const Template: StoryFn<typeof Navbar> = () => <Navbar />

export const Component = Template.bind({})
Component.args = {}
