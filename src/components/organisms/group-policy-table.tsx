import type { UIGroupPolicyInfo } from 'types'
import { formatDate } from 'util/date'

import { getQuorum, getThreshold } from 'api/policy.helpers'

import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@/atoms'

export const GroupPolicyTable = ({ policies }: { policies: UIGroupPolicyInfo[] }) => {
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
              <Td>{p.decision_policy.windows.voting_period}</Td>
              <Td>{getThreshold(p)}</Td>
              <Td>{getQuorum(p)}</Td>
              <Td>{p.admin}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
