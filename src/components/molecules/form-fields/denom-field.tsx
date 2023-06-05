import { useController, useFormContext } from 'react-hook-form'

import { Heading, HStack, Text } from '@/atoms'
import { SelectDropdown } from '@/molecules/select-dropdown'

import { FieldControl, type FieldProps } from './field-control'

type Props = FieldProps & {
  available?: any[] // TODO
}

/** Denom select input */
export const DenomField = ({ available, ...fieldProps }: Props) => {
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

  let denoms: string[]
  if (available) {
    denoms = available.map((b) => b.denom)
  } else {
    denoms = []
  }

  let maxAmount: string
  const balance = available?.find((b) => b.denom === getValues('denom'))
  if (balance) {
    maxAmount = balance.amount
  } else {
    maxAmount = '0'
  }

  return (
    <FieldControl
      {...fieldProps}
      error={error}
      label=" "
      labelRight={
        <HStack
          style={{
            justifyContent: 'end',
            minWidth: '400px',
            position: 'absolute',
            right: '0',
            top: '-20px',
          }}
        >
          <Text fontSize="xs">{'Available:' + ' '}</Text>
          <Heading variant="label" fontSize="xs">
            {maxAmount} {field.value}
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
