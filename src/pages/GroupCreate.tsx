import { useState } from 'react'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import { useSteps } from 'chakra-ui-steps'

import { type GroupFormValues, defaultGroupFormValues } from 'models'
import { createGroup } from 'store/Group'
import { TOAST_DEFAULTS } from 'util/constants'
import { toErrorWithMessage } from 'util/errors'

import { useToast } from '@/atoms'
import { GroupForm } from '@/organisms/GroupForm'
import { StepperTemplate } from '@/templates/StepperTemplate'

type ContextType = ReturnType<typeof useSteps>

const steps = ['Create Group', 'Create Group Policy', 'Finished']

/** Context + layout for create flow */
export const GroupCreateSteps = () => {
  const { activeStep, nextStep, prevStep, reset, setStep } = useSteps({ initialStep: 0 })
  return (
    <StepperTemplate
      activeStep={activeStep}
      steps={steps}
      // nextBtn={{ text: 'Next', onClick: () => void null }}
    >
      <Outlet context={{ activeStep, nextStep, prevStep, reset, setStep }} />
    </StepperTemplate>
  )
}

export function useGroupCreateContext() {
  return useOutletContext<ContextType>()
}

export default function GroupCreate() {
  const toast = useToast()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  async function handleCreate(values: GroupFormValues) {
    setSubmitting(true)
    try {
      const { transactionHash } = await createGroup(values)
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
      toast({
        ...TOAST_DEFAULTS,
        title: 'Group creation failed',
        description: toErrorWithMessage(err).message,
        status: 'error',
        duration: 9000,
      })
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <GroupForm
      onSubmit={handleCreate}
      submitting={submitting}
      defaultValues={defaultGroupFormValues}
    />
  )
}
