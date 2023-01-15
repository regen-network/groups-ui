import { useState } from 'react'

import { SPACING } from 'util/style.constants'

import { useSteps } from 'hooks/chakra'

import { AnimatePresence, HorizontalSlide } from '@/animations'
import { Button, Flex, Heading, PageContainer, RouteLink, Stack, Text } from '@/atoms'
import { PageStepper } from '@/molecules'
import { type ProposalFormValues, ProposalForm } from '@/organisms/proposal-form'
import { ProposalReview } from '@/organisms/proposal-review'

const Finished = ({ linkTo }: { linkTo: string }) => (
  <Stack spacing={8}>
    <Heading>{'Your proposal is open'}</Heading>
    <Text>{'You have successfully created a proposal!'}</Text>
    <Button as={RouteLink} to={linkTo} alignSelf="center">
      View your proposal
    </Button>
  </Stack>
)

export const ProposalTemplate = (props: {
  initialProposalFormValues: ProposalFormValues
  /** ID of new proposal, used for redirect link */
  newProposalId?: string
  submit: (values: ProposalFormValues) => Promise<boolean>
  steps: string[]
  groupName: string
}) => {
  const { activeStep, nextStep, prevStep } = useSteps({
    initialStep: 0,
  })
  const [proposalValues, setProposalValues] = useState<ProposalFormValues>(
    props.initialProposalFormValues,
  )
  const [submitting, setSubmitting] = useState(false)
  const [priorStep, setPriorStep] = useState(0)

  function handleStep1(values: ProposalFormValues) {
    setProposalValues(values)
    nextStep()
  }

  function handlePrev() {
    setPriorStep(activeStep)
    prevStep()
  }

  async function handleSubmit(proposalValues: ProposalFormValues) {
    setSubmitting(true)
    const success = await props.submit({
      ...proposalValues,
    })
    setSubmitting(false)
    if (success) nextStep()
  }

  function renderStep() {
    switch (activeStep) {
      case 0:
        return (
          <HorizontalSlide key="step-0" fromRight={priorStep !== 0}>
            <ProposalForm
              defaultValues={proposalValues}
              groupName={props.groupName}
              onSubmit={handleStep1}
            />
          </HorizontalSlide>
        )
      case 1:
        return (
          <HorizontalSlide key="step-1">
            <ProposalReview groupName={props.groupName} values={proposalValues} />
          </HorizontalSlide>
        )
      case 2:
        return (
          <HorizontalSlide key="step-2">
            <Finished
              linkTo={props.newProposalId ? `/${props.newProposalId}/details` : '/'}
            />
          </HorizontalSlide>
        )
      default:
        return null
    }
  }

  return (
    <Flex flexDir="column">
      <PageStepper activeStep={activeStep} steps={props.steps} />
      <PageContainer centerContent maxW={SPACING.formWidth}>
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </PageContainer>
    </Flex>
  )
}
