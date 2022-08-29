import { useAdminGroups, useMemberGroups } from 'hooks/useGroups'

import { Button, Flex, Heading, RouteLink } from '@/atoms'
import { MyGroupsTable } from '@/organisms/MyGroupsTable'
import { PageTemplate } from '@/templates/PageTemplate'

export default function Groups() {
  const { data: memberGroups } = useMemberGroups()
  const { data: adminGroups } = useAdminGroups()

  console.log('memberGroups :>> ', memberGroups)
  console.log('adminGroups :>> ', adminGroups)

  return (
    <PageTemplate>
      <Flex flexDir="column" w="100%" gap={3}>
        <Flex justify="space-between">
          <Heading>Groups</Heading>
          <Button size="large" px={4} as={RouteLink} to="/groups/new">
            Create Group
          </Button>
        </Flex>
        <MyGroupsTable memberGroups={memberGroups} adminGroups={adminGroups} />
      </Flex>
    </PageTemplate>
  )
}
