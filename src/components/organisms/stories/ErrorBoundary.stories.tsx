import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ErrorFallback } from '../ErrorFallback'

export default {
  title: 'Organisms/ErrorFallback',
  component: ErrorFallback,
  argTypes: {
    resetErrorBoundary: { action: 'resetErrorBoundary' },
  },
} as ComponentMeta<typeof ErrorFallback>

const fakeError = new Error('Fake error message')

const Template: ComponentStory<typeof ErrorFallback> = (args) => (
  <ErrorFallback resetErrorBoundary={args.resetErrorBoundary} error={fakeError} />
)

export const Component = Template.bind({})
Component.args = {}
