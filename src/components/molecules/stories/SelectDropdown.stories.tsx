// import { useState } from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SelectDropdown } from '../SelectDropdown'

export default {
  title: 'Molecules/Select Dropdown',
  component: SelectDropdown,
  argTypes: {
    onChange: { control: false },
  },
} as ComponentMeta<typeof SelectDropdown>

const Template: ComponentStory<typeof SelectDropdown> = (args) => {
  // const [value, setValue] = useState<string>()
  return <SelectDropdown {...args} />
}

export const Component = Template.bind({})
Component.args = {
  label: 'select',
  items: [
    { value: '1', label: 'one' },
    { value: '2', label: 'two' },
    { value: '3', label: 'three' },
  ],
}
