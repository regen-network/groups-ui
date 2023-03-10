import type { Meta, StoryFn } from '@storybook/react'

import { FormCard } from '../form-card'

export default {
  title: 'Molecules/Form Card',
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

export const Base = Template.bind({})
Base.args = {}

export const WithTitle = Template.bind({})
WithTitle.args = {
  title: 'Form card with title',
}
