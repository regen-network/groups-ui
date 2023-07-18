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
  onChange: OnSelectChange
  label: string
  items: SelectItem[]
  value?: string
}

export const SelectDropdown = forwardRef((p: SelectDropdownProps, ref) => {
  return (
    <Select
      chakraStyles={{
        menu: (provided) => ({ ...provided, zIndex: 1000 }),
      }}
      ref={ref}
      placeholder={p.label}
      value={p.items.find((i) => p.value === i.value)}
      options={p.items}
      onChange={p.onChange}
    />
  )
})
