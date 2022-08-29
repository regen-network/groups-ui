import { useAdminGroups, useMemberGroups } from 'hooks/useGroups'

import { Button, Flex, Link, RouteLink, Stack, Text } from '@/atoms'
import { MyGroupsTable } from '@/organisms/MyGroupsTable'
import { PageTemplate } from '@/templates/PageTemplate'

export default function Groups() {
  const { data: memberGroups } = useMemberGroups()
  const { data: adminGroups } = useAdminGroups()

  console.log('memberGroups :>> ', memberGroups)
  console.log('adminGroups :>> ', adminGroups)

  return (
    <PageTemplate>
      <Stack w="100%" spacing={4}>
        <Flex justify="space-between">
          <Text variant="h4">Groups</Text>
          <div>
            <Button size="large" variant="outline" as={RouteLink} to="/groups/new">
              {/* <Button size="large" variant="solid"> */}
              Create Group
            </Button>
          </div>
        </Flex>
        <MyGroupsTable memberGroups={memberGroups} adminGroups={adminGroups} />
      </Stack>
    </PageTemplate>
  )
}
