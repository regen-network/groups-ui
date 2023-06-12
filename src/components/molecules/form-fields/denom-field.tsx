import { useController, useFormContext } from 'react-hook-form'

import { CoinSDKType } from 'types'

import { Heading, HStack, Text } from '@/atoms'
import { SelectDropdown } from '@/molecules/select-dropdown'

import { FieldControl, type FieldProps } from './field-control'

type Props = FieldProps & {
  balances: CoinSDKType[]
}

/** Denom select dropdown */
export const DenomField = ({ balances, ...fieldProps }: Props) => {
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
  if (balances) {
    denoms = balances.map((b) => b.denom)
  } else {
    denoms = []
  }

  let maxAmount: string
  const balance = balances?.find((b) => b.denom === getValues('denom'))
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
        balances.length ? (
          <HStack
            style={{
              justifyContent: 'end',
              minWidth: '400px',
              position: 'absolute',
              right: '0',
              top: '-20px',
            }}
          >
            <Text fontSize="xs">{'Available: '}</Text>
            <Heading variant="label" fontSize="xs">
              {maxAmount} {field.value}
            </Heading>
          </HStack>
        ) : (
          <></>
        )
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
