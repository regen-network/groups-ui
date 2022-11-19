import { Meta, StoryFn } from '@storybook/react'

import { FormCard } from '..'

export default {
  title: 'Atoms/Form Card',
  component: FormCard,
  argTypes: {
    title: {
      options: ['With title', null],
      control: 'radio',
    },
  },
} as Meta<typeof FormCard>

const Template: StoryFn<typeof FormCard> = (args) => (
  <FormCard {...args}>Content within form card</FormCard>
)

export const Component = Template.bind({})
Component.args = {}
