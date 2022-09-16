import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Loading } from '../loading'

export default {
  title: 'Molecules/Loading',
  component: Loading,
} as ComponentMeta<typeof Loading>

const Template: ComponentStory<typeof Loading> = () => <Loading />

export const Component = Template.bind({})
