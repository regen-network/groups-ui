import { useSnapshot } from 'valtio'
import { z } from 'zod'

import { valid } from 'util/validation/zod'

import { useZodForm } from 'hooks/use-zod-form'
import { Chain } from 'store/chain.store'

import { Form } from '@/molecules/form'
import { SelectField } from '@/molecules/form-fields'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'

const schema = z.object({
  validator: valid.bech32Address,
  stakeType: z.literal('claim'),
})

export type ClaimFormValues = z.infer<typeof schema>

export const ClaimForm = (props: {
  defaultValues: ClaimFormValues
  formId: string
  onSubmit: (data: ClaimFormValues) => void
}) => {
  const { validators } = useSnapshot(Chain)
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
    <Form form={form} onSubmit={props.onSubmit} id={props.formId}>
      <SelectField
        required
        name="validator"
        label="Validator"
        selected={items.find((i) => i.value === form.getValues().validator)}
        dropdownLabel="Select a validator"
        items={items}
      />
      <FormSubmitHiddenButton id={props.formId} />
    </Form>
  )
}
