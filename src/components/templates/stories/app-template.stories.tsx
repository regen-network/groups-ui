import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AppTemplate } from '../app-template'

export default {
  title: 'Templates/Alert',
  component: AppTemplate,
  argTypes: {
    onBtnClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof AppTemplate>

const Template: ComponentStory<typeof AppTemplate> = () => <AppTemplate />

export const Component = Template.bind({})
Component.args = {}

export const ComponentWithChildren = Template.bind({})
ComponentWithChildren.args = {
  ...Component.args,
  children: <div>testing children</div>,
}
