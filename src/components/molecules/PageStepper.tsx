import { Box, Step, StepLabel, Stepper } from '@/atoms'

export const PageStepper = (props: { activeStep: number; steps: string[] }) => {
  const { activeStep, steps } = props
  return (
    <Box sx={{ py: 2.5, width: '100%', bgcolor: 'action.selected' }}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, i) => (
          <Step key={`${step}-${i}`}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
