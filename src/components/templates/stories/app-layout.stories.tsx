import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AppLayout } from '../app-layout'

export default {
  title: 'Templates/App layout',
  component: AppLayout,
  argTypes: {
    onBtnClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof AppLayout>

const Template: ComponentStory<typeof AppLayout> = () => <AppLayout />

export const Component = Template.bind({})
Component.args = {}

export const ComponentWithChildren = Template.bind({})
ComponentWithChildren.args = {
  ...Component.args,
  children: <div>testing children</div>,
}
