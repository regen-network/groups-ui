import { type ContainerProps, Container } from './chakra-components'

export const PageContainer = ({
  children,
  maxW = 'container.xl',
  ...containerProps
}: ContainerProps) => {
  return (
    <Container {...containerProps} maxW={maxW} pt={8} pb={16} h="full">
      {children}
    </Container>
  )
}
