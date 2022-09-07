import { useParams } from 'react-router-dom'

import { useGroup, useGroupMembers, useGroupPolicies } from 'hooks/useQuery'

import { Button, Flex, Heading, Stack, Text } from '@/atoms'
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

  return (
    <PageTemplate>
      <Stack w="full" spacing={6}>
        <Flex justify="space-between">
          <Heading>{group?.metadata.name || 'Loading...'}</Heading>
          <Button>Edit Group</Button>
        </Flex>
        <Text>{group?.metadata.description}</Text>
        <GroupMembersTable members={members || []} />
      </Stack>
    </PageTemplate>
  )
}
