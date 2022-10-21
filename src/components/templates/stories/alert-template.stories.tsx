import { Meta, ComponentStoryFn } from '@storybook/react'

import { AlertTemplate } from '../alert-template'

export default {
  title: 'Templates/Alert',
  component: AlertTemplate,
  argTypes: {
    onBtnClick: { action: 'clicked' },
  },
} as Meta<typeof AlertTemplate>

const Template: ComponentStoryFn<typeof AlertTemplate> = (args) => (
  <AlertTemplate {...args} />
)

export const Component = Template.bind({})
Component.args = {
  btnText: 'ClickMe',
  text: 'Alert text',
  title: 'Alert title',
}

export const ComponentWithChildren = Template.bind({})
ComponentWithChildren.args = {
  ...Component.args,
  children: <div>testing children</div>,
}
