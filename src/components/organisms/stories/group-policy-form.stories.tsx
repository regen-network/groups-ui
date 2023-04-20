import type { Meta, StoryFn } from '@storybook/react'

import { defaultGroupPolicyFormValues } from 'util/form.defaults'

import { GroupPolicyForm } from '../group-policy-form'

export default {
  title: 'Organisms/GroupPolicyForm',
  component: GroupPolicyForm,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
  },
} as Meta<typeof GroupPolicyForm>

const Template: StoryFn<typeof GroupPolicyForm> = (args) => <GroupPolicyForm {...args} />

export const Component = Template.bind({})
Component.args = {
  defaultValues: defaultGroupPolicyFormValues,
}
