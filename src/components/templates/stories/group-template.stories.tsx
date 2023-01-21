import type { Meta, StoryFn } from '@storybook/react'

import { defaultGroupFormValues, defaultGroupPolicyFormValues } from 'util/form.defaults'

import { GroupCRUDTemplate } from '../group-crud-template'

export default {
  title: 'Templates/Group',
  component: GroupCRUDTemplate,
  argTypes: {
    submit: { action: 'clicked' },
  },
} as Meta<typeof GroupCRUDTemplate>

const Template: StoryFn<typeof GroupCRUDTemplate> = (args) => (
  <GroupCRUDTemplate {...args} />
)

const onSubmit = async () => {
  return true
}

export const Component = Template.bind({})
Component.args = {
  initialGroupFormValues: defaultGroupFormValues,
  initialPolicyFormValues: defaultGroupPolicyFormValues,
  steps: ['Step 1', 'Step 2', 'Step 3'],
  submit: onSubmit,
}
