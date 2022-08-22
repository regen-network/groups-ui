import { ReactNode } from 'react'

import { CenterCol, Text } from '@/atoms'
import { PageStepper } from '@/molecules'

import { PageTemplate } from './PageTemplate'

export const StepperTemplate = (props: {
  children: ReactNode
  activeStep: number
  steps: string[]
}) => {
  const { activeStep, children, steps } = props
  return (
    <CenterCol sx={{ justifyContent: 'flex-start' }}>
      <PageStepper activeStep={activeStep} steps={steps} />
      <PageTemplate>
        <Text variant="h2" sx={{ textAlign: 'center' }}>
          {steps[activeStep]}
        </Text>
        {children}
      </PageTemplate>
    </CenterCol>
  )
}
