import { Step, Steps } from 'chakra-ui-steps'

import { useColorModeValue } from 'hooks/chakra'

import { Box, Container } from '@/atoms'

export const PageStepper = (p: { activeStep: number; steps: string[] }) => {
  return (
    <Box py={5} bg={useColorModeValue('gray.100', 'gray.900')}>
      <Container maxW="container.xl">
        <Steps activeStep={p.activeStep}>
          {p.steps.map((step, i) => (
            <Step key={`${step}-${i}`} label={step} />
          ))}
        </Steps>
      </Container>
    </Box>
  )
}
