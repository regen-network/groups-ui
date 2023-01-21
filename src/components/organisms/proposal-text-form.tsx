import { z } from 'zod'

import { defaultTextFormValues } from 'util/form.defaults'
import { valid } from 'util/validation/zod'

import { useZodForm } from 'hooks/use-zod-form'

import { Form } from '@/molecules/form'
import { FormCard } from '@/molecules/form-card'
import { FeeDisplayField, TextareaField } from '@/molecules/form-fields'

const schema = z.object({
  text: valid.description,
})

export type TextProposalFormValues = z.infer<typeof schema>

export const ProposalTextForm = (props: {
  defaultValues?: TextProposalFormValues
  formId: string
  onSubmit: (values: TextProposalFormValues) => void
  onError: () => void
}) => {
  const form = useZodForm({
    schema,
    defaultValues: { ...defaultTextFormValues, ...props.defaultValues },
  })
  return (
    <FormCard title="Text">
      <Form
        form={form}
        onSubmit={props.onSubmit}
        onError={props.onError}
        id={props.formId}
      >
        <TextareaField required name="text" label="Proposal Text" />
        <FeeDisplayField />
      </Form>
    </FormCard>
  )
}
