import type { ReactNode } from 'react'
import { useParams } from 'react-router-dom'

import { UIProposal } from 'types'
import { formatDate } from 'util/date'

import { ROUTE_PATH } from 'routes'
import { ProposalStatus } from 'api/proposal.utils'

import {
  type BadgeProps,
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@/atoms'
import { TableTitlebar } from '@/molecules/table-titlebar'

type Props = {
  proposals: UIProposal[]
  onExecute?: (proposal: UIProposal) => void
  title?: string
}

const FIRST_COL_WIDTH = '7rem'

export const GroupProposalsTable = ({ proposals, onExecute, title }: Props) => {
  function renderProposal(proposal: UIProposal, i: number) {
    const key = 'row-' + i + proposal.id.toString()
    const baseProps = { key, proposal }
    switch (proposal.status) {
      case ProposalStatus.PROPOSAL_STATUS_ACCEPTED:
        return <ExecuteRow {...baseProps} onExecute={onExecute} />
      default:
        return <Row {...baseProps} />
    }
  }
  return (
    <TableContainer>
      {title && <TableTitlebar title={title} />}
      {proposals.length > 0 ? (
        <Table size="lg" variant="striped">
          <Thead>
            <Tr>
              <Th w={FIRST_COL_WIDTH}>Date</Th>
              <Th>Name</Th>
            </Tr>
          </Thead>
          <Tbody>{proposals.map(renderProposal)}</Tbody>
        </Table>
      ) : (
        <Center minH="7rem">
          <Heading size="md">Nothing to show</Heading>
        </Center>
      )}
    </TableContainer>
  )
}

const Row = ({ proposal, children }: { children?: ReactNode; proposal: UIProposal }) => {
  const { groupId } = useParams()
  const badge = getBadgeInfo(proposal)
  if (!groupId) return null
  return (
    <Tr>
      <Td w={FIRST_COL_WIDTH}>{formatDate(proposal.submitTime)}</Td>
      <Td textAlign="right" pr={0} w={10}>
        <Badge rounded="full" colorScheme={badge.colorScheme}>
          {badge.text}
        </Badge>
      </Td>
      <Td pl={4}>
        <HStack spacing={4}>
          <Badge colorScheme="gray">{`#${proposal.id}`}</Badge>
          <Text fontWeight="bold">
            <Link to={ROUTE_PATH.proposal(groupId, proposal.id.toString())}>
              {proposal.metadata.title}
            </Link>
          </Text>
          {children && (
            <Flex justify="end" flex={1}>
              {children}
            </Flex>
          )}
        </HStack>
      </Td>
    </Tr>
  )
}

const ExecuteRow = ({
  proposal,
  onExecute = (proposal) =>
    console.error('onExecute not implemented for proposal, ', proposal.id),
}: {
  onExecute?: (proposal: UIProposal) => void
  proposal: UIProposal
}) => {
  return (
    <Row proposal={proposal}>
      <Button variant="outline" colorScheme="blue" onClick={() => onExecute(proposal)}>
        Execute
      </Button>
    </Row>
  )
}

function getBadgeInfo(proposal: UIProposal): {
  colorScheme: BadgeProps['colorScheme']
  text: string
} {
  switch (proposal.status) {
    case ProposalStatus.PROPOSAL_STATUS_ABORTED:
      return { colorScheme: 'pink', text: 'Aborted' }
    case ProposalStatus.PROPOSAL_STATUS_ACCEPTED:
      return { colorScheme: 'green', text: 'Passed' }
    case ProposalStatus.PROPOSAL_STATUS_REJECTED:
      return { colorScheme: 'red', text: 'Rejected' }
    case ProposalStatus.PROPOSAL_STATUS_SUBMITTED:
      return { colorScheme: 'blue', text: 'Submitted' }
    case ProposalStatus.PROPOSAL_STATUS_WITHDRAWN:
      return { colorScheme: 'purple', text: 'Withdrawn' }
    case ProposalStatus.UNRECOGNIZED:
      return { colorScheme: 'red', text: 'unrecognized' }
    case ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED:
    default:
      return { colorScheme: 'gray', text: 'Unknown' }
  }
}
