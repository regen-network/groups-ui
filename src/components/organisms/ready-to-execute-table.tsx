import { UIProposal } from 'types'
import { formatDate } from 'util/date'

import { Card } from '@/atoms/card'
import {
  Badge,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@/atoms/chakra-components'
import { TableContainer } from '@/atoms/table-container'
import { TableTitlebar } from '@/molecules/table-titlebar'

type Props = {
  proposals: UIProposal[]
}

export const ReadyToExecuteTable = ({ proposals }: Props) => {
  const width = '7rem'
  return (
    <TableContainer>
      <TableTitlebar title="Ready to execute" />
      <Table size="lg" variant="striped">
        <Thead>
          <Tr>
            <Th w={width}>Date</Th>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {proposals.map((p, i) => (
            <Tr key={i + p.id.toString()}>
              <Td w={width}>{formatDate(p.submitTime)}</Td>
              <Td>
                <HStack spacing={3}>
                  <Badge rounded="full" colorScheme="orange">
                    Unfinalized
                  </Badge>
                  <Badge colorScheme="gray">{`#${p.id}`}</Badge>
                  <Text fontWeight="bold">{p.metadata.title}</Text>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
