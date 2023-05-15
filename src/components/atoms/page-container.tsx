import { Container, type ContainerProps } from './chakra-components'

export const PageContainer = ({
  children,
  maxW = 'container.xl',
  flexGrow = 1,
  ...containerProps
}: ContainerProps) => {
  return (
    <Container {...containerProps} maxW={maxW} flexGrow={flexGrow} pt={8} pb={16}>
      {children}
    </Container>
  )
}
