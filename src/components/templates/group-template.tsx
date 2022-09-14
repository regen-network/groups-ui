import { useState } from 'react'

import type { GroupWithPolicyFormValues } from 'types'

import { useSteps } from 'hooks/chakra'

import { AnimatePresence, HorizontalSlide } from '@/animations'
import { Button, Flex, Heading, PageContainer, RouteLink, Stack, Text } from '@/atoms'
import { PageStepper } from '@/molecules'
import { type GroupFormValues, GroupForm, GroupFormKeys } from '@/organisms/group-form'
import {
  type GroupPolicyFormValues,
  GroupPolicyForm,
} from '@/organisms/group-policy-form'

const Finished = ({ text, linkTo }: { text: string; linkTo: string }) => (
  <Stack spacing={8}>
    <Text>{text}</Text>
    <Button as={RouteLink} to={linkTo} alignSelf="center">
      View your group page
    </Button>
  </Stack>
)

export default function GroupTemplate({
  initialGroupFormValues,
  disabledGroupFormFields,
  initialPolicyFormValues,
  linkToGroupId,
  submit,
  steps,
  text,
}: {
  disabledGroupFormFields?: GroupFormKeys[]
  initialGroupFormValues: GroupFormValues
  initialPolicyFormValues: GroupPolicyFormValues
  /** ID of group, used for redirect link */
  linkToGroupId?: string
  submit: (values: GroupWithPolicyFormValues) => Promise<boolean>
  steps: string[]
  text: {
    submitBtn?: string
    finished: string
  }
}) {
  const { activeStep, nextStep, prevStep /* reset, setStep */ } = useSteps({
    initialStep: 0,
  })
  const [groupValues, setGroupValues] = useState<GroupFormValues>(initialGroupFormValues)
  const [submitting, setSubmitting] = useState(false)
  const [priorStep, setPriorStep] = useState(0)

  const { threshold, votingWindow, percentage } = initialPolicyFormValues

  function handleGroupSubmit(values: GroupFormValues) {
    setGroupValues(values)
    nextStep()
  }

  function handlePrev() {
    setPriorStep(activeStep)
    prevStep()
  }

  async function handleSubmit(policyValues: GroupPolicyFormValues) {
    setSubmitting(true)
    const success = await submit({
      ...policyValues,
      ...groupValues,
    })
    setSubmitting(false)
    if (success) nextStep()
  }

  function renderStep() {
    switch (activeStep) {
      case 0:
        return (
          <HorizontalSlide key="step-0" fromRight={priorStep !== 0}>
            <GroupForm
              disabledFields={disabledGroupFormFields}
              onSubmit={handleGroupSubmit}
              defaultValues={groupValues}
              btnText="Next"
            />
          </HorizontalSlide>
        )
      case 1:
        return (
          <HorizontalSlide key="step-1">
            <GroupPolicyForm
              submitting={submitting}
              onSubmit={handleSubmit}
              defaultValues={{ threshold, votingWindow, percentage }}
              goBack={handlePrev}
              btnText={text.submitBtn}
            />
          </HorizontalSlide>
        )
      case 2:
        return (
          <HorizontalSlide key="step-2">
            <Finished
              text={text.finished}
              linkTo={linkToGroupId ? `/${linkToGroupId}/details` : '/'}
            />
          </HorizontalSlide>
        )
      default:
        return null
    }
  }

  return (
    <Flex flexDir="column">
      <PageStepper activeStep={activeStep} steps={steps} />
      <PageContainer>
        <Heading textAlign="center" mb={8}>
          {steps[activeStep]}
        </Heading>
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </PageContainer>
    </Flex>
  )
}
