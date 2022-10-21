import { ComponentStoryFn, Meta } from '@storybook/react'

import { ErrorFallback } from '../error-fallback'

export default {
  title: 'Organisms/ErrorFallback',
  component: ErrorFallback,
  argTypes: {
    resetErrorBoundary: { action: 'resetErrorBoundary' },
  },
} as Meta<typeof ErrorFallback>

const fakeError = new Error('Fake error message')

const Template: ComponentStoryFn<typeof ErrorFallback> = (args) => (
  <ErrorFallback resetErrorBoundary={args.resetErrorBoundary} error={fakeError} />
)

export const Component = Template.bind({})
Component.args = {}
