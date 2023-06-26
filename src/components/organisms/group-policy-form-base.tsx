import { z } from 'zod'

import { valid } from 'util/validation/zod'

import { useZodForm } from 'hooks/use-zod-form'

import { Form } from '@/molecules/form'
import { NumberFieldWithSideLabel, RadioGroupField } from '@/molecules/form-fields'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'

export const schema = z.object({
  votingWindow: valid.positiveNumber,
  threshold: valid.positiveNumberOrEmptyStr.optional(),
  percentage: valid.percentOrEmptyStr.optional(),
  policyType: z.enum(['threshold', 'percentage']),
})

export type GroupPolicyFormValues = z.infer<typeof schema>

export const GroupPolicyFormBase = ({ formId }: { formId?: string }) => {
  return (
    <>
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
      <FormSubmitHiddenButton id={formId || 'group-policy-form'} />
    </>
  )
}
