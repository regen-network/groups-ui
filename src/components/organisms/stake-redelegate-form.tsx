import { useSnapshot } from 'valtio'
import { z } from 'zod'

import { getFeeDenom } from 'util/helpers'
import { valid } from 'util/validation/zod'

import { useZodForm } from 'hooks/use-zod-form'
import { Chain } from 'store/chain.store'

import { Grid, GridItem } from '@/atoms'
import { Form } from '@/molecules/form'
import { AmountField, SelectField } from '@/molecules/form-fields'
import { DenomField } from '@/molecules/form-fields/denom-field'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'

const schema = z.object({
  fromValidator: valid.bech32Address,
  toValidator: valid.bech32Address,
  amount: valid.amount,
  denom: valid.denom,
  stakeType: z.literal('redelegate'),
})

export type RedelegateFormValues = z.infer<typeof schema>

export const RedelegateForm = (props: {
  defaultValues: RedelegateFormValues
  formId: string
  maxAmount: string
  onSubmit: (data: RedelegateFormValues) => void
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
      denom: getFeeDenom(fee),
      fromValidator: items[0].value,
    },
  })

  return (
    <Form form={form} onSubmit={props.onSubmit} id={props.formId}>
      <SelectField
        required
        name="fromValidator"
        label="From validator"
        selected={items.find((i) => i.value === form.getValues().fromValidator)}
        dropdownLabel="Select a validator"
        items={items}
      />
      <SelectField
        required
        name="toValidator"
        label="To validator"
        selected={items.find((i) => i.value === form.getValues().toValidator)}
        dropdownLabel="Select a validator"
        items={items}
      />
      <Grid alignItems="end" gridTemplateColumns={'1fr 150px'} gap={2}>
        <GridItem>
          <AmountField required name="amount" label="Amount" maxValue={props.maxAmount} />
        </GridItem>
        <GridItem>
          <DenomField
            required
            name="denom"
            denoms={[getFeeDenom(fee)]}
            maxValue={props.maxAmount}
          />
        </GridItem>
      </Grid>
      <FormSubmitHiddenButton id={props.formId} />
    </Form>
  )
}
