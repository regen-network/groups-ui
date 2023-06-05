import { useSnapshot } from 'valtio'
import { z } from 'zod'

import { valid } from 'util/validation/zod'

import { useZodForm } from 'hooks/use-zod-form'
import { Chain } from 'store/chain.store'

import { Grid, GridItem } from '@/atoms'
import { Form } from '@/molecules/form'
import { AmountField } from '@/molecules/form-fields'
import { DenomField } from '@/molecules/form-fields/denom-field'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'

const schema = z.object({
  amount: valid.amount,
  denom: valid.denom,
  stakeType: z.literal('claim'),
})

export type ClaimFormValues = z.infer<typeof schema>

export const ClaimForm = (props: {
  defaultValues: ClaimFormValues
  formId: string
  onSubmit: (data: ClaimFormValues) => void
}) => {
  const { stakeDenom } = useSnapshot(Chain)
  const form = useZodForm({
    schema,
    defaultValues: {
      ...props.defaultValues,
      denom: stakeDenom,
    },
  })

  return (
    <Form form={form} onSubmit={props.onSubmit} id={props.formId}>
      <Grid alignItems="end" gridTemplateColumns={'1fr 150px'} gap={2}>
        <GridItem>
          <AmountField
            required
            name="amount"
            label="Amount"
            balances={[]} // TODO(#79): use claimable amount from validator
          />
        </GridItem>
        <GridItem>
          <DenomField
            required
            name="denom"
            balances={[]} // TODO(#79): use claimable amount from validator
          />
        </GridItem>
      </Grid>
      <FormSubmitHiddenButton id={props.formId} />
    </Form>
  )
}
