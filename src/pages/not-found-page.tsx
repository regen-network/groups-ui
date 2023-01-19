import { Button, Heading, Text, VStack } from '@/atoms/chakra-components'
import { RouteLink } from '@/atoms/route-link'

export default function NotFound() {
  return (
    <VStack spacing={4} mt={12}>
      <Heading size="2xl">Whoops!</Heading>
      <Text>{'Page not found :('}</Text>
      <Button as={RouteLink} to="/">
        Home Page
      </Button>
    </VStack>
  )
}
