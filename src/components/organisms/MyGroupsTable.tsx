import type { UIGroupWithMembers } from 'models'
import { formatDate } from 'util/date'

import { Center, Paper, Table, TableContainer, TBody, Td, Text, THead, Tr } from '@/atoms'

export interface GroupTableItem {
  name: string
  created: string
  edited: string
  memberCount: number
  type: 'admin' | 'member'
}

function convertGroup(
  { createdAt, members, metadata: { name, updatedAt } }: UIGroupWithMembers,
  type: 'admin' | 'member',
): GroupTableItem {
  return {
    name,
    created: formatDate(createdAt),
    edited: formatDate(updatedAt),
    memberCount: members.length,
    type,
  }
}

export const MyGroupsTable = ({
  memberGroups,
  adminGroups,
}: {
  memberGroups?: UIGroupWithMembers[]
  adminGroups?: UIGroupWithMembers[]
}) => {
  const adminItems = (adminGroups || []).map((m) => convertGroup(m, 'admin'))
  const memberItems = (memberGroups || []).map((m) => convertGroup(m, 'member'))
  const tableData: GroupTableItem[] = [...adminItems, ...memberItems]

  if (tableData.length === 0) {
    return (
      <Center hFull>
        <Text variant="h3">No groups</Text>
      </Center>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <THead>
          <Tr sx={{ '& > th': { fontWeight: 'bold' } }}>
            <Td>Name</Td>
            <Td>Created</Td>
            <Td>Last Edited</Td>
            <Td>Number of Members</Td>
            <Td>Membership Type</Td>
          </Tr>
        </THead>
        <TBody>
          {tableData.map((group, i) => (
            <Tr key={i + group.name}>
              <Td>{group.name}</Td>
              <Td>{group.created}</Td>
              <Td>{group.edited}</Td>
              <Td>{group.memberCount}</Td>
              <Td>{group.type}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </TableContainer>
  )
}
