import { useParams } from 'react-router-dom'

import { useGroup, useGroupMembers, useGroupPolicies } from 'hooks/useQuery'

import { Button, Flex, Heading, HStack, Stack, Text } from '@/atoms'
import { GroupMembersTable } from '@/organisms/GroupMembersTable'
import { PageTemplate } from '@/templates/PageTemplate'

export default function GroupDetails() {
  const { groupId } = useParams()
  const { data: group } = useGroup(groupId)
  const { data: members } = useGroupMembers(groupId)
  const { data: policies } = useGroupPolicies(groupId)

  console.log('group :>> ', group)
  console.log('members :>> ', members)
  console.log('policies :>> ', policies)
  const [policy] = policies?.group_policies ?? []

  const policyIsAdmin = policy?.admin === policy?.address

  return (
    <PageTemplate>
      <Stack w="full" spacing={6}>
        <Flex justify="space-between">
          <Heading>{group?.metadata.name}</Heading>
          <Button>Edit Group</Button>
        </Flex>
        <Text fontSize="larger">{group?.metadata.description}</Text>
        <HStack spacing={3}>
          <Heading variant="label" size="xs">
            Group Admin
          </Heading>
          <Text>{policyIsAdmin ? 'Group Policy' : policy?.admin}</Text>
        </HStack>
        <GroupMembersTable members={members || []} />
      </Stack>
    </PageTemplate>
  )
}
