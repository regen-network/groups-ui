import type { UIGroupPolicyInfo } from 'types'
import { formatDate } from 'util/date'

import {
  formatPercentage,
  formatThreshold,
  formatVotingPeriod,
  isThresholdPolicy,
} from 'api/policy.utils'
import { useBreakpointValue } from 'hooks/chakra-hooks'

import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@/atoms'
import { NoItemCard } from '@/molecules/no-item-card'
import { TableTitlebar } from '@/molecules/table-titlebar'
import { Truncate } from '@/molecules/truncate'

import { NoPolicyIcon } from 'assets/tsx/no-policy-icon'

const HEADER = 'Group Policy'

export const GroupPolicyTable = ({ policies }: { policies: UIGroupPolicyInfo[] }) => {
  const tailSize = useBreakpointValue({ base: 4, sm: 6, md: 25, lg: 35, xl: 100 })
  const [p] = policies
  if (!p)
    return (
      <NoItemCard
        header={HEADER}
        body={{
          icon: <NoPolicyIcon width="100" height="100" />,
          header: 'No group policy',
          buttonText: 'add policy',
          onClick: () => {
            console.log('TODO')
          },
        }}
      />
    )
  return (
    <TableContainer borderWidth={1}>
      <TableTitlebar title={HEADER} />
      <Table variant="striped" size="lg">
        <Thead>
          <Tr>
            <Th>Created</Th>
            <Th>Voting window</Th>
            <Th>{isThresholdPolicy(p.decisionPolicy) ? 'Threshold' : 'Percentage'}</Th>
            <Th>Address</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{formatDate(p.createdAt)}</Td>
            <Td>{formatVotingPeriod(p)}</Td>
            <Td>
              {isThresholdPolicy(p.decisionPolicy)
                ? formatThreshold(p)
                : formatPercentage(p)}
            </Td>
            <Td>
              <Truncate clickToCopy tailLength={tailSize} text={p.address} />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
