import { type ActionMeta, Select, SingleValue } from 'chakra-react-select'

import { forwardRef } from '@/atoms'

type SelectItem = {
  value: string
  label: string
}

type OnSelectChange = (
  newValue: SingleValue<SelectItem>,
  actionMeta: ActionMeta<SelectItem>,
) => void

export type SelectDropdownProps = {
  selected?: SelectItem
  onChange: OnSelectChange
  label: string
  items: SelectItem[]
}

export const SelectDropdown = forwardRef((p: SelectDropdownProps, ref) => {
  return (
    <Select
      ref={ref}
      placeholder={p.label}
      value={p.selected}
      options={p.items}
      onChange={p.onChange}
    />
  )
})
