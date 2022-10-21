import { ComponentStoryFn, Meta } from '@storybook/react'

import { Navbar } from '../navbar'

export default {
  title: 'Organisms/Navbar',
  component: Navbar,
  argTypes: {},
} as Meta<typeof Navbar>

const Template: ComponentStoryFn<typeof Navbar> = () => <Navbar />

export const Component = Template.bind({})
Component.args = {}
