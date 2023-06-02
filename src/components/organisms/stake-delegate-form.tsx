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
  validator: valid.bech32Address,
  amount: valid.amount,
  denom: z.string().optional(), // TODO
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
      denom: getFeeDenom(fee),
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
      <FormSubmitHiddenButton id={props.formId} onSubmit={props.onSubmit} />
    </Form>
  )
}
