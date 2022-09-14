import type { UIGroupPolicyInfo } from 'types'
import { formatDate } from 'util/date'

import {
  formatPercentage,
  formatThreshold,
  formatVotingPeriod,
  isThresholdPolicy,
} from 'api/policy.utils'
import { useBreakpointValue } from 'hooks/chakra'

import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@/atoms'
import { TableTitlebar } from '@/molecules'
import { Truncate } from '@/molecules/Truncate'

export const GroupPolicyTable = ({ policies }: { policies: UIGroupPolicyInfo[] }) => {
  const tailSize = useBreakpointValue({ base: 4, sm: 6, md: 25, lg: 35, xl: 100 })
  const [p] = policies
  if (!p) return null
  return (
    <TableContainer w="full" borderRadius="lg" borderWidth={2} shadow="md">
      <TableTitlebar title="Group Policy" />
      <Table variant="striped" size="lg">
        <Thead>
          <Tr sx={{ '& > th': { fontWeight: 'bold' } }}>
            <Th>Created</Th>
            <Th>Voting window</Th>
            <Th>{isThresholdPolicy(p.decision_policy) ? 'Threshold' : 'Percentage'}</Th>
            <Th>Admin</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* {policies.map((p, i) => ( */}
          <Tr>
            <Td>{formatDate(p.created_at)}</Td>
            <Td>{formatVotingPeriod(p)}</Td>
            <Td>
              {isThresholdPolicy(p.decision_policy)
                ? formatThreshold(p)
                : formatPercentage(p)}
            </Td>
            <Td>
              <Truncate tailLength={tailSize} text={p.admin} />
            </Td>
          </Tr>
          {/* ))} */}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
