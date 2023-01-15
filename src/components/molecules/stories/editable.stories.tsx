import { Meta, StoryFn } from '@storybook/react'

import { EditableDescription, EditableHeading } from '../editable'

export default {
  title: 'Molecules/Editable',
  component: EditableHeading,
} as Meta<typeof EditableHeading>

const HeadingTemplate: StoryFn<typeof EditableHeading> = (args) => (
  <EditableHeading {...args} />
)
const TextTemplate: StoryFn<typeof EditableDescription> = (args) => (
  <EditableDescription {...args} />
)

const onSubmit = (value: string) => console.log(value)

export const Heading = HeadingTemplate.bind({})
Heading.args = { value: 'Editable Heading', onSave: onSubmit }

export const TextShort = TextTemplate.bind({})
TextShort.args = {
  onSave: onSubmit,
  value: 'Editable Text',
}

export const TextEmpty = TextTemplate.bind({})
TextEmpty.args = {}

export const TextLong = TextTemplate.bind({})
TextLong.args = {
  onSave: onSubmit,
  value:
    'Editable Text Duis commodo sint anim eu incididunt ut in voluptate enim aliqua adipisicing incididunt deserunt culpa.',
}
