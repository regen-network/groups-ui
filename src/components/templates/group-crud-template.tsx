import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type {
  GroupFormKeys,
  GroupFormValues,
  GroupPolicyFormValues,
  GroupWithPolicyFormValues,
} from 'types'
import { SPACING } from 'util/constants'

import { ROUTE_PATH } from 'routes'
import { useSteps } from 'hooks/chakra-hooks'

import { AnimatePresence, HorizontalSlide } from '@/animations'
import { Button, Flex, Heading, PageContainer, RouteLink, Stack, Text } from '@/atoms'
import { FormFooter, useFormFooter } from '@/molecules/form-footer'
import { PageStepper } from '@/molecules/page-stepper'
import { GroupForm } from '@/organisms/group-form'
import { GroupPolicyForm } from '@/organisms/group-policy-form'

const Finished = ({ text, linkTo }: { text: string; linkTo: string }) => (
  <Stack spacing={8}>
    <Text align="center">{text}</Text>
    <Button as={RouteLink} to={linkTo} alignSelf="center">
      View your group page
    </Button>
  </Stack>
)

export function GroupCRUDTemplate({
  initialGroupFormValues,
  disabledGroupFormFields,
  initialPolicyFormValues,
  newGroupId,
  submit,
  steps,
  text,
  policyAsGroupAdmin = false,
  policyAsPolicyAdmin = false,
}: {
  disabledGroupFormFields?: GroupFormKeys[]
  initialGroupFormValues: GroupFormValues
  initialPolicyFormValues: GroupPolicyFormValues
  /** ID of new group, used for redirect link */
  newGroupId?: string
  submit: (values: GroupWithPolicyFormValues) => Promise<boolean>
  steps: string[]
  text: {
    finished: string
    submitBtn?: string
  }
  policyAsGroupAdmin?: boolean
  policyAsPolicyAdmin?: boolean
}) {
  const navigate = useNavigate()
  const { activeStep, nextStep, prevStep } = useSteps({
    initialStep: 0,
  })
  const [groupValues, setGroupValues] = useState<GroupFormValues>(initialGroupFormValues)
  const [submitting, setSubmitting] = useState(false)
  const [priorStep, setPriorStep] = useState(0)

  const { threshold, votingWindow, percentage, policyType } = initialPolicyFormValues

  function handleGroupSubmit(values: GroupFormValues) {
    if (policyAsGroupAdmin && newGroupId) {
      // TODO prefill proposal with group values that changed
      navigate(ROUTE_PATH.proposalCreate(newGroupId), {
        state: { newProposalType: 'update-group' },
      })
    } else {
      setGroupValues(values)
      nextStep()
    }
  }

  function handlePrev() {
    setPriorStep(activeStep)
    prevStep()
  }

  function handleNext() {
    setPriorStep(activeStep)
    nextStep()
  }

  async function handleSubmit(policyValues: GroupPolicyFormValues) {
    if (policyAsPolicyAdmin && newGroupId) {
      navigate(ROUTE_PATH.proposalCreate(newGroupId), {
        state: {
          newProposalType: 'update-group',
          newUpdateGroupProposalValues: {
            votingWindow: policyValues.votingWindow,
            policyType: policyValues.policyType,
            threshold: policyValues.threshold,
            percentage: policyValues.percentage,
            updateGroupType: 'decision-policy',
          },
        },
      })
    } else {
      setSubmitting(true)
      const success = await submit({
        ...policyValues,
        ...groupValues,
      })
      setSubmitting(false)
      if (success) nextStep()
    }
  }

  useFormFooter({
    onNext: activeStep === 0 && steps.length > 2 ? handleNext : undefined,
    onPrev: activeStep === 1 ? handlePrev : undefined,
    btnText:
      activeStep === 0
        ? policyAsGroupAdmin
          ? 'Create Proposal'
          : 'Next'
        : activeStep === 1
        ? text.submitBtn
        : undefined,
  })

  function renderStep() {
    switch (activeStep + 3 - steps.length) {
      case 0:
        return (
          <HorizontalSlide key="step-0" fromRight={priorStep !== 0}>
            <GroupForm
              disabledFields={disabledGroupFormFields}
              onSubmit={handleGroupSubmit}
              defaultValues={groupValues}
            />
          </HorizontalSlide>
        )
      case 1:
        return (
          <HorizontalSlide key="step-1">
            <GroupPolicyForm
              onSubmit={handleSubmit}
              defaultValues={{ threshold, votingWindow, percentage, policyType }}
            />
          </HorizontalSlide>
        )
      case 2:
        return (
          <HorizontalSlide key="step-2">
            <Finished
              text={text.finished}
              linkTo={newGroupId ? ROUTE_PATH.group(newGroupId) : ROUTE_PATH.groups}
            />
          </HorizontalSlide>
        )
      default:
        return null
    }
  }

  return (
    <Flex flexDir="column" flex={1}>
      <PageStepper activeStep={activeStep} steps={steps} />
      <PageContainer centerContent maxW={SPACING.formWidth}>
        <Heading textAlign="center" mb={8}>
          {steps[activeStep]}
        </Heading>
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </PageContainer>
      <FormFooter isSubmitting={submitting} />
    </Flex>
  )
}
