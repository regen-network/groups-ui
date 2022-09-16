import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Navbar } from '../navbar'

export default {
  title: 'Organisms/Navbar',
  component: Navbar,
  argTypes: {},
} as ComponentMeta<typeof Navbar>

const Template: ComponentStory<typeof Navbar> = () => <Navbar />

export const Component = Template.bind({})
Component.args = {}
