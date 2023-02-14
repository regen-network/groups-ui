import { useColorModeValue } from 'hooks/chakra-hooks'

import { Card, CardBody } from '@/atoms'

export const JSONDisplay = ({ data }: { data: Record<string, unknown> }) => {
  return (
    <Card shadow="none">
      <CardBody bg={useColorModeValue('gray.100', 'gray.700')}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </CardBody>
    </Card>
  )
}
