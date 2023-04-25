import type { UICoin, UIGroup, UIGroupPolicyInfo, UIProposal } from 'types'
import { formatDate } from 'util/date'

import { ROUTE_PATH } from 'routes'

import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Link,
  PageContainer,
  RouteLink,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from '@/atoms'
import { CoinBalanceTotalInfo } from '@/molecules/coin-balance-total-info'
import { ProposalActionButtons } from '@/molecules/proposal-action-buttons'
import { TableTitlebar } from '@/molecules/table-titlebar'
import { GroupProposalsTable } from '@/organisms/group-proposals-table'

import { ChatIcon } from 'assets/tsx'

export const GroupTemplate = ({
  group,
  policies,
  balances,
  onExecute,
  proposals,
}: {
  group: UIGroup
  policies?: UIGroupPolicyInfo[]
  balances?: UICoin[]
  onExecute: (proposal: UIProposal) => void
  proposals: {
    accepted: UIProposal[]
    submitted: UIProposal[]
    history: UIProposal[]
  }
}) => {
  const { name, description, forumLink } = group.metadata
  return (
    <PageContainer>
      <Stack spacing={4}>
        <Flex justify="space-between">
          <Heading>{name}</Heading>
          <Button
            size="large"
            px={4}
            as={RouteLink}
            variant="outline"
            to={ROUTE_PATH.groupDetails(group.id.toString())}
          >
            group details
          </Button>
        </Flex>

        <Flex justify="space-between">
          <Text fontSize="lg">{description}</Text>
          <Text fontSize="sm">{`Created ${formatDate(group.createdAt, 'long')}`}</Text>
        </Flex>
        {forumLink && (
          <Link href={forumLink} target="_blank" rel="noopener noreferrer">
            <ChatIcon mr={3} />
            {'View discussion on group forum»'}
          </Link>
        )}
        <CoinBalanceTotalInfo coins={balances} />
      </Stack>
      <Stack mt={8} spacing={6}>
        <TableContainer>
          <TableTitlebar title="Actions" />
          {policies && policies.length > 0 ? (
            <Table>
              <Tbody>
                <Tr>
                  <Td>
                    <HStack>
                      <ProposalActionButtons
                        groupId={group.id.toString()}
                        btnProps={{ flex: 1 }}
                      />
                    </HStack>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          ) : (
            <Center minH="7rem">
              <Heading size="md">Nothing to show</Heading>
            </Center>
          )}
        </TableContainer>
        <GroupProposalsTable
          title="Ready to Execute"
          proposals={proposals.accepted}
          onExecute={onExecute}
        />
        <GroupProposalsTable title="Proposed Actions" proposals={proposals.submitted} />
        <GroupProposalsTable title="History" proposals={proposals.history} />
      </Stack>
    </PageContainer>
  )
}
