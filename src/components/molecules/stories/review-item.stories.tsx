import type { Meta, StoryFn } from '@storybook/react'

import { ReviewItem } from '../review-item'

export default {
  title: 'Molecules/ReviewItem',
  component: ReviewItem,
} as Meta<typeof ReviewItem>

const Template: StoryFn<typeof ReviewItem> = (args) => <ReviewItem {...args} />

export const Component = Template.bind({})
Component.args = {
  label: 'Label text',
  children: 'body text',
}
