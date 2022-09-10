import { ReactNode } from 'react'

import { Container } from './chakra'

export const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Container centerContent maxW="container.xl" pt={8} pb={16} h="full">
      {children}
    </Container>
  )
}
