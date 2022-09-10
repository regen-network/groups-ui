import { ComponentMeta, ComponentStory } from '@storybook/react'

import { defaultGroupFormValues, GroupForm } from '../group-form'

// TODO: need to mock Wallet store for this to render
export default {
  title: 'Organisms/Group Form',
  component: GroupForm,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
  },
} as ComponentMeta<typeof GroupForm>

const Template: ComponentStory<typeof GroupForm> = (args) => <GroupForm {...args} />

export const Component = Template.bind({})
Component.args = {
  defaultValues: defaultGroupFormValues,
}
