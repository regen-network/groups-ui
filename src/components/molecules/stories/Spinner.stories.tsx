import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Spinner } from '../Spinner'

export default {
  title: 'Molecules/Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>

const Template: ComponentStory<typeof Spinner> = () => <Spinner />

export const Base = Template.bind({})
