// import type { UIGroupWithMembers } from 'types'
import { type UIGroupWithMembers } from 'types'
import { formatDate } from 'util/date'

import { ROUTE_PATH } from 'routes'

import {
  Badge,
  Center,
  Heading,
  HStack,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@/atoms'

export const MyGroupsTable = ({
  memberGroups = [],
  adminGroups = [],
}: {
  memberGroups?: UIGroupWithMembers[]
  adminGroups?: UIGroupWithMembers[]
}) => {
  const memberAndAdmin = adminGroups
    .filter((g) => memberGroups.some((mg) => mg.id === g.id))
    .map((g) => ({ ...g, type: ['member', 'admin'] }))

  const onlyAdmin = adminGroups
    .filter((g) => !memberAndAdmin.some((mag) => mag.id === g.id))
    .map((g) => ({ ...g, type: ['admin'] }))

  const onlyMember = memberGroups
    .filter((g) => !memberAndAdmin.some((mag) => mag.id === g.id))
    .map((g) => ({ ...g, type: ['member'] }))
  const groups = [...memberAndAdmin, ...onlyAdmin, ...onlyMember]

  if (groups.length === 0) {
    return (
      <Center h={250} w="full" borderWidth={1} borderRadius="lg">
        <Heading as="h3" size="lg">
          No groups
        </Heading>
      </Center>
    )
  }

  return (
    <TableContainer>
      <Table variant="striped" size="lg">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Created</Th>
            <Th>Last Edited</Th>
            <Th>Number of Members</Th>
            <Th>Membership Type</Th>
          </Tr>
        </Thead>
        <Tbody>
          {groups.map((group, i) => (
            <Tr key={i + group.metadata.name}>
              <Td>
                <Link to={ROUTE_PATH.group(group.id.toString())}>
                  {group.metadata.name}
                </Link>
              </Td>
              <Td>{formatDate(group.createdAt)}</Td>
              <Td>{formatDate(group.metadata.updatedAt)}</Td>
              <Td>{group.members.length}</Td>
              <Td>
                <HStack spacing={3}>
                  {group.type.map((type, i) => (
                    <Badge key={type + i}>{type}</Badge>
                  ))}
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
