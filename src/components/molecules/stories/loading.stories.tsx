import { ComponentStoryFn, Meta } from '@storybook/react'

import { Loading } from '../loading'

export default {
  title: 'Molecules/Loading',
  component: Loading,
} as Meta<typeof Loading>

const Template: ComponentStoryFn<typeof Loading> = () => <Loading />

export const Component = Template.bind({})
