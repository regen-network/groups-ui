import { ReactNode } from 'react'
import { Step, Steps } from 'chakra-ui-steps'

import { Box, Container, Flex, Heading, useColorModeValue } from '@/atoms'

import { PageTemplate } from './PageTemplate'

export const StepperTemplate = (p: {
  children: ReactNode
  activeStep: number
  steps: string[]
  // nextBtn?: {
  //   text: string
  //   onClick: () => void
  // }
}) => {
  return (
    <Flex flexDir="column">
      <Box py={5} bg={useColorModeValue('gray.100', 'gray.900')}>
        <Container maxW="container.xl">
          <Steps activeStep={p.activeStep}>
            {p.steps.map((step, i) => (
              <Step key={`${step}-${i}`} label={step} />
            ))}
          </Steps>
        </Container>
      </Box>
      <PageTemplate>
        <Heading textAlign="center" mb={8}>
          {p.steps[p.activeStep]}
        </Heading>
        {p.children}
      </PageTemplate>
      {/* {!!p.nextBtn && (
        <StickyFooter
          sx={{ mt: 8 }}
          btnText={p.nextBtn.text}
          onBtnClick={p.nextBtn.onClick}
        />
      )} */}
    </Flex>
  )
}
