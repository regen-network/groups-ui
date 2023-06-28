import { useState } from 'react'

import type { ProposalUpdateGroupFormValues, UICoin } from 'types'
import { SPACING } from 'util/constants'

import { ROUTE_PATH } from 'routes'
import { useSteps } from 'hooks/chakra-hooks'

import { AnimatePresence, HorizontalSlide } from '@/animations'
import { Button, Flex, Heading, PageContainer, RouteLink, Stack, Text } from '@/atoms'
import { FormFooter, useFormFooter } from '@/molecules/form-footer'
import { PageStepper } from '@/molecules/page-stepper'
import { ProposalForm, type ProposalFormValues } from '@/organisms/proposal-form'
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

export const ProposalCRUDTemplate = (props: {
  groupId: string
  groupName: string
  groupPolicyAddress: string
  initialProposalFormValues: ProposalFormValues
  policyBalances: UICoin[]
  steps: string[]
  submit: (values: ProposalFormValues) => Promise<string | null>
  policyAsGroupAdmin?: boolean
  policyAsPolicyAdmin?: boolean
  updateGroupFormValues?: ProposalUpdateGroupFormValues
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

  useFormFooter({
    btnText: activeStep === 0 ? 'Save & Next' : 'Submit',
    onPrev: activeStep === 1 ? handlePrev : undefined,
  })

  function renderStep() {
    switch (activeStep) {
      case 0:
        return (
          <HorizontalSlide key="step-0" fromRight={priorStep !== 0}>
            <ProposalForm
              policyBalances={props.policyBalances}
              defaultValues={proposalValues}
              groupName={props.groupName}
              onSubmit={handleSave}
              policyAsGroupAdmin={props.policyAsGroupAdmin}
              policyAsPolicyAdmin={props.policyAsPolicyAdmin}
              updateGroupFormValues={props.updateGroupFormValues}
            />
          </HorizontalSlide>
        )
      case 1:
        return (
          <HorizontalSlide key="step-1">
            <ProposalReview
              groupName={props.groupName}
              groupPolicyAddress={props.groupPolicyAddress}
              values={proposalValues}
              onPrev={handlePrev}
              onSubmit={handleSubmit}
            />
          </HorizontalSlide>
        )
      case 2:
        return (
          <HorizontalSlide key="step-2">
            <Finished
              linkTo={
                newProposalId
                  ? ROUTE_PATH.proposal(props.groupId, newProposalId)
                  : ROUTE_PATH.group(props.groupId)
              }
            />
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
