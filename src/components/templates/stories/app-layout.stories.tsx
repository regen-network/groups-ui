import { ComponentStoryFn, Meta } from '@storybook/react'

import { AppLayout } from '../app-layout'

export default {
  title: 'Templates/App layout',
  component: AppLayout,
  argTypes: {
    onBtnClick: { action: 'clicked' },
  },
} as Meta<typeof AppLayout>

const Template: ComponentStoryFn<typeof AppLayout> = () => (
  <AppLayout>
    <div>hello</div>
  </AppLayout>
)

export const Component = Template.bind({})
Component.args = {}

export const ComponentWithChildren = Template.bind({})
ComponentWithChildren.args = {
  ...Component.args,
  children: <div>testing children</div>,
}
