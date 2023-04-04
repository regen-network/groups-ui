import { useMemo } from 'react'

import type { UIGroupMember, Vote } from 'types'

import { Center, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@/atoms'
import { TableTitlebar } from '@/molecules/table-titlebar'
import { Truncate } from '@/molecules/truncate'

export const ProposalVotesTable = ({
  votes,
  groupMembers,
}: {
  votes: Vote[]
  groupMembers: UIGroupMember[]
}) => {
  // votes don't include `weight` by default - if other components need a
  // similar data structure, might make sense to extract this
  const weightMap = useMemo(() => {
    return groupMembers.reduce((map: { [key: string]: string }, { member }) => {
      map[member.address] = member.weight
      return map
    }, {})
  }, [groupMembers])

  return (
    <TableContainer>
      <TableTitlebar title="Votes" />
      {votes.length === 0 ? (
        <Center h={40}>
          <Heading size="lg">No votes</Heading>
        </Center>
      ) : (
        <Table variant="striped" size="lg">
          <Thead>
            <Tr>
              <Th>Vote Option</Th>
              {/* <Th>Status</Th> */}
              <Th>Voting Weight</Th>
              <Th>Address</Th>
            </Tr>
          </Thead>
          <Tbody>
            {votes.map((vote, i) => (
              <Tr key={i + vote.voter}>
                <Td>{vote.option}</Td>
                <Td>{weightMap[vote.voter]}</Td>
                <Td>
                  <Truncate
                    clickToCopy
                    headLength={18}
                    tailLength={18}
                    text={vote.voter}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </TableContainer>
  )
}
