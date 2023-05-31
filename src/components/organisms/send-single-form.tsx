import { useSnapshot } from 'valtio'
import { z } from 'zod'

import { getFeeDenom } from 'util/helpers'
import { valid } from 'util/validation/zod'

import { useZodForm } from 'hooks/use-zod-form'
import { Chain } from 'store/chain.store'

import { Form } from '@/molecules/form'
import { AmountField, InputField } from '@/molecules/form-fields'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'

const schema = z.object({
  toAddress: valid.bech32Address,
  amount: valid.amount,
  sendType: z.literal('single'),
})

export type SingleFormValues = z.infer<typeof schema>

export const SingleForm = (props: {
  defaultValues: SingleFormValues
  formId: string
  maxAmount: string
  onSubmit: (data: SingleFormValues) => void
  onError: () => void
}) => {
  const { fee } = useSnapshot(Chain)
  const form = useZodForm({
    schema,
    defaultValues: {
      ...props.defaultValues,
    },
  })
  return (
    <Form id={props.formId} form={form} onSubmit={props.onSubmit} onError={props.onError}>
      <InputField required name="toAddress" label="To Address" />
      <AmountField
        required
        name="amount"
        label="Amount"
        maxValue={props.maxAmount}
        denom={getFeeDenom(fee)}
      />
      <FormSubmitHiddenButton id={props.formId} onSubmit={props.onSubmit} />
    </Form>
  )
}
