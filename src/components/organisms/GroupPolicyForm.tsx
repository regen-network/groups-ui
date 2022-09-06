import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { SPACING } from 'util/constants'
import { valid } from 'util/validation/zod'

import { Button, Flex, FormCard, IconButton, Stack, Text } from '@/atoms'
import { NumberField } from '@/molecules/FormFields'

import { BackIcon } from 'assets/tsx'

export type GroupPolicyFormValues = {
  votingWindow: number
  threshold: number
  quorum?: number
}

export const defaultGroupPolicyFormValues: GroupPolicyFormValues = {
  votingWindow: 0,
  threshold: 51,
}

const resolver = zodResolver(
  z.object({
    votingWindow: valid.votingWindow,
    threshold: valid.threshold,
    quorum: valid.quorum.optional(),
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
  const form = useForm<GroupPolicyFormValues>({ defaultValues, resolver })
  return (
    <FormCard>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack spacing={SPACING.formStack}>
            <NumberField
              required
              name="votingWindow"
              label="Voting Window"
              numberInputProps={{ min: 0 }}
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
              numberInputProps={{ min: 0 }}
            >
              <Flex align="center" minW="50%">
                <Text ml={5} fontWeight="bold">
                  {'yes votes of 100 (51%)'}
                </Text>
              </Flex>
            </NumberField>
            <NumberField
              name="quorum"
              label="Define a quorum"
              numberInputProps={{ min: 0, flex: 1 }}
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
