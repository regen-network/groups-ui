import { z } from 'zod'

import { useZodForm } from 'hooks/use-zod-form'

import { Form } from '@/molecules/form'
import { GroupPolicyFields } from '@/molecules/group-policy-fields'
import { schema as baseSchema } from '@/organisms/group-policy-form'

const schema = baseSchema.extend({
  updateGroupType: z.literal('decision-policy'),
})

export type DecisionPolicyFormValues = z.infer<typeof schema>

export const DecisionPolicyForm = ({
  defaultValues,
  formId,
  onSubmit,
  onError,
}: {
  defaultValues: DecisionPolicyFormValues
  formId: string
  onSubmit: (data: DecisionPolicyFormValues) => void
  onError: () => void
}) => {
  const form = useZodForm({
    defaultValues,
    schema,
  })

  function handleSubmit(data: DecisionPolicyFormValues) {
    const percentage = form.getValues().percentage
    const threshold = form.getValues().threshold
    const policyType = form.getValues().policyType
    if (policyType === 'percentage' && !percentage) {
      form.setError('percentage', {
        type: 'required',
        message: 'Please enter a percentage value',
      })
      return
    }
    if (policyType === 'threshold' && !threshold) {
      form.setError('threshold', {
        type: 'required',
        message: 'Please enter a threshold value',
      })
      return
    }
    return onSubmit(data)
  }

  return (
    <Form id={formId} form={form} onSubmit={handleSubmit} onError={onError}>
      <GroupPolicyFields formId={formId} />
    </Form>
  )
}
