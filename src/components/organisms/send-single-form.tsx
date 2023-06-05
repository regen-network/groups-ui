import { useSnapshot } from 'valtio'
import { z } from 'zod'

import { valid } from 'util/validation/zod'

import { useZodForm } from 'hooks/use-zod-form'
import { Chain } from 'store/chain.store'

import { Grid, GridItem } from '@/atoms'
import { Form } from '@/molecules/form'
import { AmountField, InputField } from '@/molecules/form-fields'
import { DenomField } from '@/molecules/form-fields/denom-field'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'

const schema = z.object({
  toAddress: valid.bech32Address,
  amount: valid.amount,
  denom: valid.denom,
  sendType: z.literal('single'),
})

export type SingleFormValues = z.infer<typeof schema>

export const SingleForm = (props: {
  defaultValues: SingleFormValues
  formId: string
  policyBalances: any // TODO
  onSubmit: (data: SingleFormValues) => void
  onError: () => void
}) => {
  const { defaultDenom } = useSnapshot(Chain)
  const form = useZodForm({
    schema,
    defaultValues: {
      ...props.defaultValues,
      denom: defaultDenom,
    },
  })

  return (
    <Form id={props.formId} form={form} onSubmit={props.onSubmit} onError={props.onError}>
      <InputField required name="toAddress" label="To Address" />
      <Grid alignItems="end" gridTemplateColumns={'1fr 150px'} gap={2}>
        <GridItem>
          <AmountField
            required
            name="amount"
            label="Amount"
            balances={props.policyBalances}
          />
        </GridItem>
        <GridItem>
          <DenomField required name="denom" balances={props.policyBalances} />
        </GridItem>
      </Grid>
      <FormSubmitHiddenButton id={props.formId} onSubmit={props.onSubmit} />
    </Form>
  )
}
