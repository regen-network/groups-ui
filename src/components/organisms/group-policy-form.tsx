import { z } from 'zod'

import { valid } from 'util/validation/zod'

import { useZodForm } from 'hooks/use-zod-form'

import { Form } from '@/molecules/form'
import { FormCard } from '@/molecules/form-card'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'

import { GroupPolicyFields } from '../molecules/group-policy-fields'

export const schema = z.object({
  votingWindow: valid.positiveNumber,
  threshold: valid.positiveNumberOrEmptyStr.optional(),
  percentage: valid.percentOrEmptyStr.optional(),
  policyType: z.enum(['threshold', 'percentage']),
})

export type GroupPolicyFormValues = z.infer<typeof schema>

export const GroupPolicyForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues: GroupPolicyFormValues
  onSubmit: (data: GroupPolicyFormValues) => void
}) => {
  const form = useZodForm({
    defaultValues,
    schema,
  })

  function handleSubmit(data: GroupPolicyFormValues) {
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
    <FormCard>
      <Form form={form} onSubmit={handleSubmit}>
        <GroupPolicyFields />
        <FormSubmitHiddenButton id="group-policy-form" />
      </Form>
    </FormCard>
  )
}
