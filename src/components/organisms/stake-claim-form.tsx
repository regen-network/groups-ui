import { useSnapshot } from 'valtio'
import { z } from 'zod'

import { getFeeDenom } from 'util/helpers'
import { valid } from 'util/validation/zod'

import { Chain } from 'store'
import { useZodForm } from 'hooks/use-zod-form'

import { Form } from '@/molecules/form'
import { AmountField, FeeDisplayField } from '@/molecules/form-fields'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'

const schema = z.object({
  amount: valid.amount,
  stakeType: z.literal('claim'),
})

export type ClaimFormValues = z.infer<typeof schema>

export const ClaimForm = (props: {
  defaultValues: ClaimFormValues
  formId: string
  maxAmount: string
  onSubmit: (data: ClaimFormValues) => void
}) => {
  const form = useZodForm({
    schema,
    defaultValues: props.defaultValues,
  })
  const { fee } = useSnapshot(Chain)
  return (
    <Form form={form} onSubmit={props.onSubmit} id={props.formId}>
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
