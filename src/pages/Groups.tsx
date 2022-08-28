import { useAdminGroups, useMemberGroups } from 'hooks/useGroups'

import { Button, FlexBetween, Link, Stack, Text } from '@/atoms'
import { MyGroupsTable } from '@/organisms/MyGroupsTable'
import { PageTemplate } from '@/templates/PageTemplate'

export default function Groups() {
  const { data: memberGroups } = useMemberGroups()
  const { data: adminGroups } = useAdminGroups()

  console.log('memberGroups :>> ', memberGroups)
  console.log('adminGroups :>> ', adminGroups)

  return (
    <PageTemplate>
      <Stack width="100%" spacing={4}>
        <FlexBetween wFull>
          <Text variant="h4">Groups</Text>
          <div>
            <Button size="large" variant="contained" component={Link} to="/groups/new">
              Create Group
            </Button>
          </div>
        </FlexBetween>
        <MyGroupsTable memberGroups={memberGroups} adminGroups={adminGroups} />
      </Stack>
    </PageTemplate>
  )
}
