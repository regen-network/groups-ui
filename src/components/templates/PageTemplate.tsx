import { ReactNode } from 'react'

import { Container } from '@/atoms'

export const PageTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <Container centerContent maxW="container.xl" pt={8} pb={16} h="full">
      {children}
    </Container>
  )
}
