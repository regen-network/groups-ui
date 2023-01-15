import { useParams } from 'react-router-dom'

import type { MemberFormValues } from 'types'
import { handleError, throwError } from 'util/errors'

import { signAndBroadcast } from 'store'
import { updateGroupMembersMsg } from 'api/member.messages'
import { useGroup, useGroupMembers, useGroupPolicies } from 'hooks/use-query'
import { useTxToasts } from 'hooks/useToasts'

import {
  Button,
  ButtonGroup,
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
  const { data: members, refetch: refetchMembers } = useGroupMembers(groupId)
  const { data: policies } = useGroupPolicies(groupId)
  const { toastSuccess, toastErr } = useTxToasts()
  const [policy] = policies ?? []
  const policyIsAdmin = policy?.admin === policy?.address

  async function handleUpdateMembers(values: MemberFormValues[]): Promise<boolean> {
    if (!groupId || !group?.admin)
      throwError(`Can't update members: missing group ID or admin`)
    const msg = updateGroupMembersMsg({
      groupId: group.id, // TODO: change to groupId?
      admin: group.admin,
      members: values,
    })
    try {
      const { transactionHash } = await signAndBroadcast([msg])
      toastSuccess(transactionHash)
      refetchMembers()
      return true
    } catch (err) {
      handleError(err)
      toastErr(err, 'Editing group')
      return false
    }
  }

  return (
    <PageContainer>
      <Stack w="full" spacing={6}>
        <Flex justify="space-between">
          <Heading>{group?.metadata.name}</Heading>
          <ButtonGroup>
            {/* TODO: This isn't in mockup, added for convenience */}
            <Button as={RouteLink} to={`/${groupId}/proposals/new`}>
              New Proposal
            </Button>
            <Button as={RouteLink} to={`/${groupId}/edit`}>
              Edit Group
            </Button>
          </ButtonGroup>
        </Flex>
        <Text fontSize="larger">{group?.metadata.description}</Text>
        <HStack spacing={3}>
          <Heading variant="label" size="xs">
            Group Admin
          </Heading>
          <Text>{policyIsAdmin ? 'Group Policy' : policy?.admin}</Text>
        </HStack>
        <GroupPolicyTable policies={policies || []} />
        <GroupMembersTable members={members || []} onSave={handleUpdateMembers} />
      </Stack>
    </PageContainer>
  )
}
