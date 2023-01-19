import { useState } from 'react'

import { SPACING } from 'util/style.constants'

import { useSteps } from 'hooks/chakra'

import { AnimatePresence, HorizontalSlide } from '@/animations'
import { Button, Flex, Heading, Stack, Text } from '@/atoms/chakra-components'
import { PageContainer } from '@/atoms/page-container'
import { RouteLink } from '@/atoms/route-link'
import { FormFooter } from '@/molecules/form-footer'
import { PageStepper } from '@/molecules/page-stepper'
import { type ProposalFormValues, ProposalForm } from '@/organisms/proposal-form'
import { ProposalReview } from '@/organisms/proposal-review'

const Finished = ({ linkTo }: { linkTo: string }) => (
  <Stack spacing={8}>
    <Heading textAlign="center">{'Your proposal is open'}</Heading>
    <Text align="center">{'You have successfully created a proposal!'}</Text>
    <Button as={RouteLink} to={linkTo} alignSelf="center">
      View your proposal
    </Button>
  </Stack>
)

export const ProposalTemplate = (props: {
  groupId: string
  groupName: string
  initialProposalFormValues: ProposalFormValues
  steps: string[]
  submit: (values: ProposalFormValues) => Promise<string | null>
}) => {
  const { activeStep, nextStep, prevStep } = useSteps({
    initialStep: 0,
  })
  const [proposalValues, setProposalValues] = useState<ProposalFormValues>(
    props.initialProposalFormValues,
  )
  const [submitting, setSubmitting] = useState(false)
  const [priorStep, setPriorStep] = useState(0)
  const [newProposalId, setNewProposalId] = useState<string>()

  function handlePrev() {
    setPriorStep(activeStep)
    prevStep()
  }

  function handleSave(values: ProposalFormValues) {
    setProposalValues(values)
    nextStep()
  }

  async function handleSubmit() {
    setSubmitting(true)
    const proposalId = await props.submit(proposalValues)
    setSubmitting(false)
    if (proposalId) {
      setNewProposalId(proposalId)
      nextStep()
    }
  }

  function renderStep() {
    switch (activeStep) {
      case 0:
        return (
          <HorizontalSlide key="step-0" fromRight={priorStep !== 0}>
            <ProposalForm
              defaultValues={proposalValues}
              groupName={props.groupName}
              onSubmit={handleSave}
            />
          </HorizontalSlide>
        )
      case 1:
        return (
          <HorizontalSlide key="step-1">
            <ProposalReview
              groupName={props.groupName}
              values={proposalValues}
              onPrev={handlePrev}
              onSubmit={handleSubmit}
            />
          </HorizontalSlide>
        )
      case 2:
        return (
          <HorizontalSlide key="step-2">
            <Finished linkTo={`/${props.groupId}/proposals/${newProposalId}`} />
          </HorizontalSlide>
        )
      default:
        return null
    }
  }

  return (
    <Flex flexDir="column" flex={1}>
      <PageStepper activeStep={activeStep} steps={props.steps} />
      <PageContainer centerContent maxW={SPACING.formWidth}>
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </PageContainer>
      <FormFooter isSubmitting={submitting} />
    </Flex>
  )
}
