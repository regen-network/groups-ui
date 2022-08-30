import { ActionMeta, Select, SingleValue } from 'chakra-react-select'

export type SelectItem = {
  value: string
  label: string
}

export type OnSelectChange = (
  newValue: SingleValue<SelectItem>,
  actionMeta: ActionMeta<SelectItem>,
) => void

export const SelectDropdown = (p: {
  selected?: SelectItem
  onChange: OnSelectChange
  label: string
  items: SelectItem[]
}) => {
  return (
    <Select
      placeholder={p.label}
      value={p.selected}
      options={p.items}
      onChange={p.onChange}
    />
  )
}
