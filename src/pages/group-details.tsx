import { useParams } from 'react-router-dom'

import { useGroup, useGroupMembers, useGroupPolicies } from 'hooks/use-query'

import {
  Button,
  Flex,
  Heading,
  HStack,
  PageContainer,
  RouteLink,
  Stack,
  Text,
} from '@/atoms'
import { GroupMembersTable } from '@/organisms/group-members-table'
import { GroupPolicyTable } from '@/organisms/group-policy-table'

export default function GroupDetails() {
  const { groupId } = useParams()
  const { data: group } = useGroup(groupId)
  const { data: members } = useGroupMembers(groupId)
  const { data: policies } = useGroupPolicies(groupId)

  const [policy] = policies ?? []
  const policyIsAdmin = policy?.admin === policy?.address

  return (
    <PageContainer>
      <Stack w="full" spacing={6}>
        <Flex justify="space-between">
          <Heading>{group?.metadata.name}</Heading>
          <Button as={RouteLink} to={`/${groupId}/edit`}>
            Edit Group
          </Button>
        </Flex>
        <Text fontSize="larger">{group?.metadata.description}</Text>
        <HStack spacing={3}>
          <Heading variant="label" size="xs">
            Group Admin
          </Heading>
          <Text>{policyIsAdmin ? 'Group Policy' : policy?.admin}</Text>
        </HStack>
        <GroupPolicyTable policies={policies || []} />
        <GroupMembersTable members={members || []} />
      </Stack>
    </PageContainer>
  )
}
