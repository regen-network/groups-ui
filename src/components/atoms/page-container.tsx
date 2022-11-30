import { type ContainerProps, Container } from './chakra'

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
