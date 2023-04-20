import { z } from 'zod'

import { valid } from 'util/validation/zod'

import { useZodForm } from 'hooks/use-zod-form'

import { Form } from '@/molecules/form'
import { FormCard } from '@/molecules/form-card'
import { NumberFieldWithSideLabel, RadioGroupField } from '@/molecules/form-fields'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'

const schema = z.object({
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
        <NumberFieldWithSideLabel
          required
          name="votingWindow"
          label="Voting Window"
          sideLabel="maximum days"
          numberInputProps={{ flex: 1, min: 1 }}
        />
        <RadioGroupField
          required
          spacing={4}
          size="lg"
          name="policyType"
          label="Policy type"
          options={[
            {
              label: 'Set a Threshold',
              value: 'threshold',
              description:
                'Defines a threshold of yes votes (based on a tally of voter weights) that must be achieved in order for a proposal to pass.',
              children: (
                <NumberFieldWithSideLabel
                  required
                  name="threshold"
                  numberInputProps={{ min: 0, flex: 1 }}
                  sideLabel="weighted 'yes' votes"
                />
              ),
            },
            {
              label: 'Set a Percentage',
              value: 'percentage',
              description:
                'A percentage decision policy is similar to a threshold decision policy, except that the threshold is not defined as a constant weight, but as a percentage.',
              children: (
                <NumberFieldWithSideLabel
                  required
                  name="percentage"
                  numberInputProps={{ min: 0, max: 100, flex: 1 }}
                  sideLabel="% of total voting power"
                />
              ),
            },
          ]}
        />
        <FormSubmitHiddenButton id="group-policy-form" />
      </Form>
    </FormCard>
  )
}
