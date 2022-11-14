import { StoryFn, Meta } from '@storybook/react'

import { RootLayout } from '../root-layout'

export default {
  title: 'Templates/App layout',
  component: RootLayout,
  argTypes: {
    onBtnClick: { action: 'clicked' },
  },
} as Meta<typeof RootLayout>

const Template: StoryFn<typeof RootLayout> = () => <RootLayout />

export const Component = Template.bind({})
Component.args = {}

export const ComponentWithChildren = Template.bind({})
ComponentWithChildren.args = {
  ...Component.args,
  children: <div>testing children</div>,
}
