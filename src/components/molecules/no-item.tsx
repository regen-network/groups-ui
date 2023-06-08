import { Center, Heading } from '@/atoms'

export const NoItem = ({
  icon,
  header,
  button,
}: {
  icon: JSX.Element
  header: string
  button: JSX.Element
}) => {
  return (
    <Center flexDir="column" pb={50}>
      {icon}
      <Heading size="sm" py={15}>
        {header}
      </Heading>
      {button}
    </Center>
  )
}
