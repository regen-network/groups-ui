import { useColorModeValue } from 'hooks/chakra-hooks'

import { Card, CardBody } from '@/atoms'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const JSONDisplay = ({ data }: { data: Record<any, unknown> }) => {
  return (
    <Card shadow="none">
      <CardBody
        bg={useColorModeValue('gray.100', 'gray.700')}
        maxWidth="700px"
        overflowX="scroll"
      >
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </CardBody>
    </Card>
  )
}
