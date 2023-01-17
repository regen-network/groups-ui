import { useParams } from 'react-router-dom'

import type { MemberFormValues } from 'types'
import { handleError, throwError } from 'util/errors'

import { signAndBroadcast } from 'store'
import { msgUpdateGroupMembers } from 'api/member.messages'
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

export default function ProposalDetails() {
  const { proposalId } = useParams()

  return (
    <PageContainer>
      <Stack w="full" spacing={6}>
        <Flex justify="space-between">
          <Heading>{'Proposal'}</Heading>
        </Flex>
      </Stack>
    </PageContainer>
  )
}
