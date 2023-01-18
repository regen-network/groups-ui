import { useSnapshot } from 'valtio'
import { z } from 'zod'

import { getFeeDenom } from 'util/helpers'
import { valid } from 'util/validation/zod'

import { Chain } from 'store'
import { useZodForm } from 'hooks/use-zod-form'

import { Form } from '@/molecules'
import { AmountField, FeeDisplayField, SelectField } from '@/molecules/form-fields'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'

const schema = z.object({
  validator: valid.bech32Address,
  amount: valid.amount,
  stakeType: z.union([z.literal('delegate'), z.literal('undelegate')]),
})

export type DelegateFormValues = z.infer<typeof schema>

export const DelegateForm = (props: {
  defaultValues: DelegateFormValues
  formId: string
  maxAmount: string
  onSubmit: (data: DelegateFormValues) => void
  onError: () => void
}) => {
  const { validators, fee } = useSnapshot(Chain)
  const items = validators.map((v, i) => {
    return {
      label: v.description?.moniker || `Validator ${i}`,
      value: v.operator_address || '',
    }
  })
  const form = useZodForm({
    schema,
    defaultValues: {
      ...props.defaultValues,
      validator: items[0].value,
    },
  })
  return (
    <Form id={props.formId} form={form} onSubmit={props.onSubmit} onError={props.onError}>
      <SelectField
        required
        name="validator"
        label="Validator"
        selected={items.find((i) => i.value === form.getValues().validator)}
        dropdownLabel="Select a validator"
        items={items}
      />
      <AmountField
        required
        name="amount"
        label="Amount"
        maxValue={props.maxAmount}
        denom={getFeeDenom(fee)}
      />
      <FeeDisplayField />
      <FormSubmitHiddenButton />
    </Form>
  )
}
