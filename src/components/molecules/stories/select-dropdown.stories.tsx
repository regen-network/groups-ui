// import { useState } from 'react'
import { ComponentStoryFn, Meta } from '@storybook/react'

import { SelectDropdown } from '../select-dropdown'

export default {
  title: 'Molecules/Select Dropdown',
  component: SelectDropdown,
  argTypes: {
    onChange: { control: false },
  },
} as Meta<typeof SelectDropdown>

const Template: ComponentStoryFn<typeof SelectDropdown> = (args) => {
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
