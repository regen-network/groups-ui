import { useController, useFormContext } from 'react-hook-form'

import { SelectDropdown, type SelectDropdownProps } from '../select-dropdown'

import { FieldControl, type FieldProps } from './field-control'

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
        label={dropdownLabel}
        onChange={(item) => {
          if (item?.value) {
            onChange(item.value)
          }
        }}
        selected={selected}
      />
    </FieldControl>
  )
}
