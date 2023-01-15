import { Wallet } from 'store'
import { useAdminGroups, useMemberGroups } from 'hooks/use-query'

import { Button, Flex, Heading, PageContainer, RouteLink } from '@/atoms'
import { MyGroupsTable } from '@/organisms/my-groups-table'

export default function Groups() {
  const { data: memberGroups } = useMemberGroups(Wallet.account?.address)
  const { data: adminGroups } = useAdminGroups(Wallet.account?.address)

  return (
    <PageContainer>
      <Flex flexDir="column" w="100%" gap={3}>
        <Flex justify="space-between" mb={8}>
          <Heading>Groups</Heading>
          <Button size="large" px={4} as={RouteLink} to="/new">
            Create Group
          </Button>
        </Flex>
        <MyGroupsTable memberGroups={memberGroups} adminGroups={adminGroups} />
      </Flex>
    </PageContainer>
  )
}
