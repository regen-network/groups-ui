import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from '../Button'

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['contained', 'outlined', 'text'],
      control: 'radio',
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: 'radio',
    },
    color: {
      options: ['primary', 'secondary'],
      control: 'radio',
    },
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
)

export const Base = Template.bind({})
Base.args = {
  variant: 'contained',
}
