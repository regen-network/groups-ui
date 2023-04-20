import { useSnapshot } from 'valtio'
import { z } from 'zod'

import { SPACING } from 'util/constants'
import { getFeeDenom } from 'util/helpers'
import { valid } from 'util/validation/zod'

import { useZodForm } from 'hooks/use-zod-form'
import { Chain } from 'store/chain.store'

import { Stack } from '@/atoms'
import { Form } from '@/molecules/form'
import { FormCard } from '@/molecules/form-card'
import { AmountField, FeeDisplayField, InputField } from '@/molecules/form-fields'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'

const schema = z.object({
  toAddress: valid.bech32Address,
  amount: valid.amount,
})

export type ProposalSendFormValues = z.infer<typeof schema>

export const ProposalSendForm = (props: {
  defaultValues: ProposalSendFormValues
  formId: string
  maxAmount: string
  onSubmit: (data: ProposalSendFormValues) => void
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
    <FormCard title="Send">
      <Stack spacing={SPACING.formStack}>
        <Form
          id={props.formId}
          form={form}
          onSubmit={props.onSubmit}
          onError={props.onError}
        >
          <InputField required name="to-address" label="To Address" />
          <AmountField
            required
            name="amount"
            label="Amount"
            maxValue={props.maxAmount}
            denom={getFeeDenom(fee)}
          />
          <FeeDisplayField />
          <FormSubmitHiddenButton id={props.formId} onSubmit={props.onSubmit} />
        </Form>
      </Stack>
    </FormCard>
  )
}
