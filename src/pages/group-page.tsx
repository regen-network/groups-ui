import { useParams } from 'react-router-dom'

import { formatDate } from 'util/date'

import { useBalances, useGroup, useGroupPoliciesWithProposals } from 'hooks/use-query'

import { Card } from '@/atoms/card'
import {
  Button,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  Table,
  Text,
  Thead,
  Tr,
} from '@/atoms/chakra-components'
import { Link } from '@/atoms/link'
import { PageContainer } from '@/atoms/page-container'
import { RouteLink } from '@/atoms/route-link'
import { CoinBalanceTotalInfo } from '@/molecules/coin-balance-total-info'
import { Loading } from '@/molecules/loading'

import { ChatIcon } from 'assets/tsx'

export default function GroupPage() {
  const { groupId } = useParams()
  const { data: group } = useGroup(groupId)
  const { data: policiesWithProposals } = useGroupPoliciesWithProposals(groupId)
  const policies = policiesWithProposals?.policies
  const proposals = policiesWithProposals?.proposals
  const groupPolicy = policies?.[0]
  const { data: balances } = useBalances(groupPolicy?.address)
  console.log('balances :>> ', balances)

  if (!group) return <Loading />

  const { name, description, forumLink, updatedAt } = group.metadata

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
            to={`/${groupId}/details`}
          >
            group details
          </Button>
        </Flex>

        <Flex justify="space-between">
          <Text fontSize="lg">{description}</Text>
          <Text fontSize="sm">{`Created ${formatDate(group.createdAt, 'long')}`}</Text>
        </Flex>
        {forumLink && (
          <Link href={forumLink}>
            <ChatIcon mr={3} />
            {'View discussion on group forum»'}
          </Link>
        )}
        <CoinBalanceTotalInfo coins={balances} />
      </Stack>
      <Stack mt={8}>
        <Card>
          <CardHeader>
            <Heading size="md">Ready to Execute</Heading>
          </CardHeader>
          <CardBody>
            <Table>
              <Thead>
                <Tr></Tr>
              </Thead>
            </Table>
          </CardBody>
        </Card>
      </Stack>
    </PageContainer>
  )
}
