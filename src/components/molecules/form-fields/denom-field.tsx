import { useController, useFormContext } from 'react-hook-form'

import { Heading, HStack, Text } from '@/atoms'
import { SelectDropdown } from '@/molecules/select-dropdown'

import { FieldControl, type FieldProps } from './field-control'

type Props = FieldProps & {
  denoms: string[]
  maxValue: string
  maxLabel?: string
}

/** Denom select input */
export const DenomField = ({
  denoms,
  maxValue = '0',
  maxLabel = 'Available:',
  ...fieldProps
}: Props) => {
  const { name, required } = fieldProps
  const { control, getValues } = useFormContext()
  const {
    fieldState: { error },
    field,
  } = useController({
    name,
    control,
    defaultValue: getValues(name),
    rules: { required },
  })

  return (
    <FieldControl
      {...fieldProps}
      error={error}
      label=" "
      labelRight={
        <HStack>
          <Text fontSize="xs">{maxLabel + ' '}</Text>
          <Heading variant="label" fontSize="xs">
            {maxValue} {field.value}
          </Heading>
        </HStack>
      }
    >
      <SelectDropdown
        label=""
        onChange={(item) => {
          if (item?.value) {
            field.onChange(item.value)
          }
        }}
        items={denoms.map((d) => ({ label: d, value: d }))}
        selected={{ label: field.value, value: field.value }}
      />
    </FieldControl>
  )
}
