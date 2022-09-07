import type { ChainGroupMember } from 'models'
import { formatDate } from 'util/date'

import { Center, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@/atoms'

export const GroupMembersTable = ({ members = [] }: { members: ChainGroupMember[] }) => {
  if (members.length === 0) {
    return (
      <Center h={250} w="full" borderWidth={1} borderRadius="lg">
        <Heading as="h3" size="lg">
          No Members
        </Heading>
      </Center>
    )
  }
  return (
    <TableContainer w="full" borderRadius="lg" borderWidth={2} shadow="md">
      <Table variant="striped" size="lg">
        <Thead>
          <Tr sx={{ '& > th': { fontWeight: 'bold' } }}>
            <Th>Address</Th>
            <Th>Voting Weight</Th>
            <Th>Date Added</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {members.map((m, i) => (
            <Tr key={i + m.member.address}>
              <Td>{m.member.address}</Td>
              <Td>{m.member.weight}</Td>
              <Td>{formatDate(m.member.addedAt)}</Td>
              <Td>X</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
