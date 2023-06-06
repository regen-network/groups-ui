import { Button, Card, CardBody, CardHeader, Center, Heading } from '@/atoms'

export const NoItemCard = ({
  header,
  body,
}: {
  header: string
  body: { icon: JSX.Element; header: string; buttonText: string; onClick: () => void }
}) => {
  return (
    <Card px={8} py={6}>
      <CardHeader p={0}>
        <Heading size="md">{header}</Heading>
      </CardHeader>
      <CardBody>
        <Center flexDir="column">
          {body.icon}
          <Heading size="sm" py={15}>
            {body.header}
          </Heading>
          <Button onClick={body.onClick}>{body.buttonText}</Button>
        </Center>
      </CardBody>
    </Card>
  )
}
