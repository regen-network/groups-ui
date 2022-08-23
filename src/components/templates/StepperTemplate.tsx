import { ReactNode } from 'react'

import { FlexCol, Title } from '@/atoms'
import { PageStepper } from '@/molecules'

import { PageTemplate } from './PageTemplate'

export const StepperTemplate = (props: {
  children: ReactNode
  activeStep: number
  steps: string[]
}) => {
  const { activeStep, children, steps } = props
  return (
    <FlexCol>
      <PageStepper activeStep={activeStep} steps={steps} />
      <PageTemplate>
        <Title align="center" mb={4}>
          {steps[activeStep]}
        </Title>
        {children}
      </PageTemplate>
    </FlexCol>
  )
}
