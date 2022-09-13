import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { SPACING } from 'util/style.constants'
import { valid } from 'util/validation/zod'

import { Button, Flex, FormCard, IconButton, Stack, Text } from '@/atoms'
import { NumberField } from '@/molecules/form-fields'

import { BackIcon } from 'assets/tsx'

export type GroupPolicyFormValues = {
  votingWindow: number
  threshold?: number
  quorum?: number
}

const resolver = zodResolver(
  z.object({
    votingWindow: valid.positiveNumStr,
    threshold: valid.positiveNumStr.optional(),
    quorum: valid.percentStr.optional(),
  }),
)

export const GroupPolicyForm = ({
  btnText = 'Submit',
  goBack,
  defaultValues,
  onSubmit,
  submitting = false,
}: {
  btnText?: string
  goBack?: () => void
  defaultValues: GroupPolicyFormValues
  onSubmit: (data: GroupPolicyFormValues) => void
  submitting?: boolean
}) => {
  const form = useForm<GroupPolicyFormValues>({
    defaultValues,
    resolver,
  })
  const { watch, setValue } = form

  const quorumField = watch('quorum')
  const thresholdField = watch('threshold')

  useEffect(() => {
    if (quorumField) {
      setValue('threshold', '' as unknown as undefined) // non-ideal, but works
    }
  }, [quorumField, setValue])

  useEffect(() => {
    if (thresholdField) {
      setValue('quorum', '' as unknown as undefined)
    }
  }, [thresholdField, setValue])

  function handleSubmit(data: GroupPolicyFormValues) {
    const quorum = form.getValues().quorum
    const threshold = form.getValues().threshold
    // neither of these should happen because of other logic, but good to have the validation check
    if (!quorum && !threshold) {
      // error if neither field is filled
      form.setError('quorum', {
        type: 'required',
        message: 'Either a quorum of a threshold is required',
      })
      form.setError('threshold', {
        type: 'required',
        message: 'Either a quorum of a threshold is required',
      })
      return
    }
    if (quorum && threshold) {
      // error if both fields are filled
      form.setError('threshold', {
        type: 'required',
        message: 'Please choose only',
      })
      form.setError('quorum', {
        type: 'required',
        message: 'one of these fields',
      })
      return
    }
    return onSubmit(data)
  }

  return (
    <FormCard>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Stack spacing={SPACING.formStack}>
            <NumberField
              required
              name="votingWindow"
              label="Voting Window"
              numberInputProps={{ min: 0, flex: 1 }}
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
              name="quorum"
              label="Define a quorum"
              numberInputProps={{ min: 0, max: 100, flex: 1 }}
            >
              <Flex align="center" minW="50%">
                <Text ml={5} fontWeight="bold">
                  {'% of total voting power'}
                </Text>
              </Flex>
            </NumberField>
            <Flex>
              {goBack && (
                <IconButton aria-label="go back" onClick={goBack} variant="outline">
                  <BackIcon />
                </IconButton>
              )}
              <Flex justify="end" flexGrow={1}>
                <Button type="submit" isLoading={submitting} loadingText="Submitting">
                  {btnText}
                </Button>
              </Flex>
            </Flex>
          </Stack>
        </form>
      </FormProvider>
    </FormCard>
  )
}
