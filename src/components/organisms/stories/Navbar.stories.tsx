import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Navbar } from '../Navbar'

export default {
  title: 'Molecules/Navbar',
  component: Navbar,
  argTypes: {},
} as ComponentMeta<typeof Navbar>

const Template: ComponentStory<typeof Navbar> = () => <Navbar />

export const Base = Template.bind({})
Base.args = {}
