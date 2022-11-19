import { Meta, StoryFn } from '@storybook/react'

import { defaultGroupFormValues, defaultGroupPolicyFormValues } from 'util/form.constants'

import GroupTemplate from '../group-template'

export default {
  title: 'Templates/Group',
  component: GroupTemplate,
  argTypes: {
    onBtnClick: { action: 'clicked' },
  },
} as Meta<typeof GroupTemplate>

const Template: StoryFn<typeof GroupTemplate> = (args) => <GroupTemplate {...args} />

export const Component = Template.bind({})
Component.args = {
  initialGroupFormValues: defaultGroupFormValues,
  initialPolicyFormValues: defaultGroupPolicyFormValues,
  steps: ['Step 1', 'Step 2', 'Step 3'],
}
