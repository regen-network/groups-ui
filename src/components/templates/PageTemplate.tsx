import { ReactNode } from 'react'

import { Container } from '@/atoms'

export const PageTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <Container centerContent maxW="container.xl" pt={4} pb={8} h="full">
      {children}
    </Container>
  )
}
