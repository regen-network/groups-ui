import { Button, Center, Heading } from '@/atoms'

export const NoItem = ({
  icon,
  header,
  buttonText,
  onClick,
}: {
  icon: JSX.Element
  header: string
  buttonText: string
  onClick: () => void
}) => {
  return (
    <Center flexDir="column" pb={50}>
      {icon}
      <Heading size="sm" py={15}>
        {header}
      </Heading>
      <Button onClick={onClick}>{buttonText}</Button>
    </Center>
  )
}
