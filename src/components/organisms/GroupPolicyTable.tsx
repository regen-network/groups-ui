import type { ChainGroupMember, ChainGroupPolicyRes } from 'models'
import { formatDate } from 'util/date'

import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@/atoms'

export const GroupPolicyTable = ({ policies }: { policies: ChainGroupPolicyRes[] }) => {
  return (
    <TableContainer w="full" borderRadius="lg" borderWidth={2} shadow="md">
      <Table variant="striped" size="lg">
        <Thead>
          <Tr sx={{ '& > th': { fontWeight: 'bold' } }}>
            <Th>Created</Th>
            <Th>Voting window</Th>
            <Th>Threshold</Th>
            <Th>Quorum</Th>
            <Th>Admin</Th>
          </Tr>
        </Thead>
        <Tbody>
          {policies.map((p, i) => (
            <Tr key={i + p.address}>
              <Td>{formatDate(p.created_at)}</Td>
              <Td>{'todo'}</Td>
              <Td>todo2</Td>
              <Td>{p.admin}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
