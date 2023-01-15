import { Meta, StoryFn } from '@storybook/react'

import { FormFooter } from '../form-footer'

export default {
  title: 'Molecules/FormFooter',
  component: FormFooter,
  argTypes: {
    onBtnClick: {
      control: false,
    },
  },
} as Meta<typeof FormFooter>

const Template: StoryFn<typeof FormFooter> = (args) => <FormFooter {...args} />

export const Component = Template.bind({})

export const WithBackBtn = Template.bind({})
WithBackBtn.args = {
  onPrev: () => void null,
}

export const WithForwardBtn = Template.bind({})
WithForwardBtn.args = {
  onNext: () => void null,
}

export const WithBothBtns = Template.bind({})
WithBothBtns.args = {
  onNext: () => void null,
  onPrev: () => void null,
}
