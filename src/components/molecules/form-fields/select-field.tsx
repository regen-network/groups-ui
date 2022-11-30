import { useController, useFormContext } from 'react-hook-form'

import { type SelectDropdownProps, SelectDropdown } from '../select-dropdown'

import { type FieldProps, FieldControl } from './field-control'

type Props = FieldProps &
  Omit<SelectDropdownProps, 'onChange'> & { dropdownLabel: string }

/** custom `Select` with controls for react-hook-form */
export const SelectField = ({
  dropdownLabel,
  helperText,
  items,
  label,
  name,
  required,
  selected,
}: Props) => {
  const { control, getValues } = useFormContext()
  const {
    fieldState: { error },
    field: { onChange, ...field },
  } = useController({
    name,
    control,
    defaultValue: getValues(name),
    rules: { required },
  })

  return (
    <FieldControl
      error={error}
      name={name}
      helperText={helperText}
      label={label}
      required={required}
    >
      <SelectDropdown
        {...field}
        items={items}
        onChange={(item) => {
          if (item?.value) {
            onChange(item.value)
          }
        }}
        label={dropdownLabel}
        selected={selected}
      />
    </FieldControl>
  )
}
