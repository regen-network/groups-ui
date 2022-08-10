import { useState } from 'react'
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
  const [value, setValue] = useState<string>()
  return <SelectDropdown {...args} value={value} onChange={(e) => setValue(e)} />
}

export const Base = Template.bind({})
Base.args = {
  label: 'select',
  items: [
    { value: '1', name: 'one' },
    { value: '2', name: 'two' },
    { value: '3', name: 'three' },
  ],
}
