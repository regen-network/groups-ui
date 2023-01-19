import { useEffect } from 'react'
import { z } from 'zod'

import { valid } from 'util/validation/zod'

import { useZodForm } from 'hooks/use-zod-form'

import { Flex, Text } from '@/atoms/chakra-components'
import { Form } from '@/molecules/form'
import { FormCard } from '@/molecules/form-card'
import { NumberField } from '@/molecules/form-fields'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'

const schema = z.object({
  votingWindow: valid.positiveNumber,
  threshold: valid.positiveNumberOrEmptyStr.optional(),
  percentage: valid.percentOrEmptyStr.optional(),
})

export type GroupPolicyFormValues = z.infer<typeof schema>

export const GroupPolicyForm = ({
  btnText = 'Submit',
  goBack,
  defaultValues,
  onSubmit,
}: {
  btnText?: string
  goBack?: () => void
  defaultValues: GroupPolicyFormValues
  onSubmit: (data: GroupPolicyFormValues) => void
}) => {
  const form = useZodForm({
    defaultValues,
    schema,
  })
  const { watch, setValue } = form

  const percentField = watch('percentage')
  const thresholdField = watch('threshold')

  useEffect(() => {
    if (percentField) {
      setValue('threshold', '')
    }
  }, [percentField, setValue])

  useEffect(() => {
    if (thresholdField) {
      setValue('percentage', '')
    }
  }, [thresholdField, setValue])

  function handleSubmit(data: GroupPolicyFormValues) {
    const percentage = form.getValues().percentage
    const threshold = form.getValues().threshold
    if (!percentage && !threshold) {
      // error if neither field is filled
      form.setError('percentage', {
        type: 'required',
        message: 'Either a percentage of a threshold is required',
      })
      form.setError('threshold', {
        type: 'required',
        message: 'Either a percentage of a threshold is required',
      })
      return
    }
    if (percentage && threshold) {
      form.setError('threshold', {
        type: 'required',
        message: 'Please choose only',
      })
      form.setError('percentage', {
        type: 'required',
        message: 'one of these fields',
      })
      return
    }
    return onSubmit(data)
  }

  return (
    <FormCard>
      <Form form={form} onSubmit={handleSubmit}>
        <NumberField
          required
          name="votingWindow"
          label="Voting Window"
          numberInputProps={{ flex: 1 }}
        >
          <Flex align="center" minW="50%">
            <Text ml={5} fontWeight="bold">
              {'maximum days'}
            </Text>
          </Flex>
        </NumberField>
        <NumberField
          required
          name="threshold"
          label="Set a threshold"
          numberInputProps={{ min: 0, flex: 1 }}
        >
          <Flex align="center" minW="50%">
            <Text ml={5} fontWeight="bold">
              {"weighted 'yes' votes"}
            </Text>
          </Flex>
        </NumberField>
        <NumberField
          required
          name="percentage"
          label="Set a percentage"
          numberInputProps={{ min: 0, max: 100, flex: 1 }}
        >
          <Flex align="center" minW="50%">
            <Text ml={5} fontWeight="bold">
              {'% of total voting power'}
            </Text>
          </Flex>
        </NumberField>

        <FormSubmitHiddenButton onPrev={goBack} btnText={btnText} />
      </Form>
    </FormCard>
  )
}
