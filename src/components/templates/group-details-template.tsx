import { UIGroupMember, UIGroupPolicyInfo } from 'types'

import { ROUTE_PATH } from 'routes'
import { Wallet } from 'store/wallet.store'

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
import {
  GroupMembersTable,
  type GroupMembersTableProps,
} from '@/organisms/group-members-table'
import { GroupPolicyTable } from '@/organisms/group-policy-table'

import { BackIcon } from 'assets/tsx'

export const GroupDetailsTemplate = ({
  admin,
  description,
  id,
  members,
  name,
  onMembersSave,
  policies,
  policyAsGroupAdmin,
}: {
  admin: string
  description?: string
  id: string
  members: UIGroupMember[]
  name: string
  onMembersSave: GroupMembersTableProps['onSave']
  policies: UIGroupPolicyInfo[]
  policyAsGroupAdmin?: boolean
}) => {
  const userAddress = Wallet.account.address
  const isAdmin = userAddress === admin
  return (
    <PageContainer>
      <Stack w="full" spacing={6}>
        <div>
          <Button
            variant="ghost"
            leftIcon={<BackIcon />}
            as={RouteLink}
            to={ROUTE_PATH.group(id)}
          >
            {name}
          </Button>
        </div>
        <Flex justify="space-between">
          <Heading>Group Details</Heading>
          {(isAdmin || policyAsGroupAdmin) && (
            <Button as={RouteLink} to={ROUTE_PATH.groupEdit(id)}>
              Edit Group
            </Button>
          )}
        </Flex>
        {description && <Text fontSize="larger">{description}</Text>}
        <HStack spacing={3}>
          <Heading variant="label" size="xs">
            Group Admin:
          </Heading>
          <Text>{admin}</Text>
        </HStack>
        <GroupPolicyTable policies={policies} groupId={id} />
        <GroupMembersTable
          members={members}
          onSave={onMembersSave}
          policyAsGroupAdmin={policyAsGroupAdmin}
          groupId={id}
        />
      </Stack>
    </PageContainer>
  )
}
