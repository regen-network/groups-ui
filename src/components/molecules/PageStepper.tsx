import { Step, Steps, useSteps } from 'chakra-ui-steps'

import { Box, Text } from '@/atoms'

export const PageStepper = (props: { activeStep: number; steps: string[] }) => {
  const { activeStep, steps } = props
  return (
    <Box py={2.5} mt={0} w="full">
      <Steps mt={0} activeStep={activeStep}>
        {steps.map((step, i) => (
          <Step key={`${step}-${i}`} label={step}>
            <Text key={i}>{step}</Text>
          </Step>
        ))}
      </Steps>
    </Box>
  )
}
