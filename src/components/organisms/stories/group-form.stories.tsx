import type { Meta, StoryFn } from '@storybook/react'

import { defaultGroupFormValues } from 'util/form.constants'

import { GroupForm } from '../group-form'

// TODO: need to mock Wallet store for this to render
export default {
  title: 'Organisms/Group Form',
  component: GroupForm,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
  },
} as Meta<typeof GroupForm>

const Template: StoryFn<typeof GroupForm> = (args) => <GroupForm {...args} />

export const Component = Template.bind({})
Component.args = {
  defaultValues: defaultGroupFormValues,
}
