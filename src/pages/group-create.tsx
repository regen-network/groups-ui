import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { type GroupPolicyFormValues } from 'models'
import { TOAST_DEFAULTS } from 'util/constants'
import { toErrorWithMessage } from 'util/errors'

import { Wallet } from 'store'
import { createGroupWithPolicy } from 'api/group.actions'
import { useSteps, useToast } from 'hooks/chakra'

import { AnimatePresence, Button, RouteLink, Stack, Text } from '@/atoms'
import { HorizontalSlide } from '@/molecules/animations'
import {
  type GroupFormValues,
  defaultGroupFormValues,
  GroupForm,
} from '@/organisms/group-form'
import {
  defaultGroupPolicyFormValues,
  GroupPolicyForm,
} from '@/organisms/group-policy-form'
import { StepperTemplate } from '@/templates/stepper-template'

const steps = ['Create Group', 'Create Group Policy', 'Finished']

export default function GroupCreate() {
  const toast = useToast()
  const navigate = useNavigate()
  const { activeStep, nextStep, prevStep /* reset, setStep */ } = useSteps({
    initialStep: 0,
  })
  const [groupValues, setGroupValues] = useState<GroupFormValues>({
    ...defaultGroupFormValues,
    admin: Wallet.account?.address ?? '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [priorStep, setPriorStep] = useState(0)

  function handleNext() {
    setPriorStep(activeStep)
    nextStep()
  }

  function handlePrev() {
    setPriorStep(activeStep)
    prevStep()
  }

  function handleGroupSubmit(values: GroupFormValues) {
    console.log('values :>> ', values)
    setGroupValues(values)
    nextStep()
  }

  async function handleCreate(policyValues: GroupPolicyFormValues) {
    setSubmitting(true)
    try {
      const { transactionHash } = await createGroupWithPolicy({
        ...groupValues,
        ...policyValues,
      })
      const time = 3000
      toast({
        ...TOAST_DEFAULTS,
        title: 'Group created',
        description: 'Transaction hash: ' + transactionHash,
        status: 'success',
        duration: time,
      })
      handleNext()
      setTimeout(() => navigate('/'), time + 500)
    } catch (err) {
      const msg = toErrorWithMessage(err).message
      console.error(err)
      toast({
        ...TOAST_DEFAULTS,
        title: 'Group creation failed',
        description: msg,
        status: 'error',
        duration: 9000,
      })
    } finally {
      setSubmitting(false)
    }
  }

  function renderStep() {
    switch (activeStep) {
      case 0:
        return (
          <HorizontalSlide key="step-0" fromLeft={priorStep === 0}>
            <GroupForm
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
              onSubmit={handleCreate}
              defaultValues={defaultGroupPolicyFormValues}
              goBack={handlePrev}
            />
          </HorizontalSlide>
        )
      case 2:
        return (
          <HorizontalSlide key="step-2">
            <Finished />
          </HorizontalSlide>
        )
      default:
        return null
    }
  }

  return (
    <StepperTemplate activeStep={activeStep} steps={steps}>
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </StepperTemplate>
  )
}

const Finished = () => (
  <Stack spacing={8}>
    <Text>You have successfully set up your group and group policy.</Text>
    <Button as={RouteLink} to="/" alignSelf="center">
      View your group page
    </Button>
  </Stack>
)
