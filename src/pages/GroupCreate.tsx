import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSteps } from 'chakra-ui-steps'

import {
  type GroupFormValues,
  type GroupPolicyFormValues,
  defaultGroupFormValues,
  defaultGroupPolicyFormValues,
} from 'models'
import { createGroupWithPolicy } from 'store/Group'
import { TOAST_DEFAULTS } from 'util/constants'
import { toErrorWithMessage } from 'util/errors'

import { Button, Heading, RouteLink, Stack, Text, useToast } from '@/atoms'
import { GroupForm } from '@/organisms/GroupForm'
import { GroupPolicyForm } from '@/organisms/GroupPolicyForm'
import { StepperTemplate } from '@/templates/StepperTemplate'

const steps = ['Create Group', 'Create Group Policy', 'Finished']

export default function GroupCreate() {
  const { activeStep, nextStep, prevStep /* reset, setStep */ } = useSteps({
    initialStep: 0,
  })
  const [groupValues, setGroupValues] = useState<GroupFormValues>(defaultGroupFormValues)
  const toast = useToast()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  function handleGroupSubmit(values: GroupFormValues) {
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
          <GroupForm
            onSubmit={handleGroupSubmit}
            defaultValues={groupValues}
            btnText="Next"
          />
        )
      case 1:
        return (
          <GroupPolicyForm
            submitting={submitting}
            onSubmit={handleCreate}
            defaultValues={defaultGroupPolicyFormValues}
            goBack={prevStep}
          />
        )
      case 2:
        return <Finished />
      default:
        return null
    }
  }

  return (
    <StepperTemplate activeStep={activeStep} steps={steps}>
      {renderStep()}
    </StepperTemplate>
  )
}

const Finished = () => (
  <Stack spacing={8}>
    <Heading>Finished</Heading>
    <Text>You have successfully set up your group and group policy.</Text>
    <Button as={RouteLink} to="/">
      View your group page
    </Button>
  </Stack>
)
