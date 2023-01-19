import { useParams } from 'react-router-dom'

import { formatDate } from 'util/date'

import { useColorModeValue } from 'hooks/chakra-hooks'
import { useBalances, useGroup, useGroupPoliciesWithProposals } from 'hooks/use-query'

import { Card } from '@/atoms/card'
import {
  Box,
  Button,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Stack,
  Table,
  Text,
  Thead,
  Tr,
} from '@/atoms/chakra-components'
import { Link } from '@/atoms/link'
import { PageContainer } from '@/atoms/page-container'
import { RouteLink } from '@/atoms/route-link'
import { Loading } from '@/molecules/loading'
import { SelectDropdown } from '@/molecules/select-dropdown'

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
  const firstBalance = balances?.[0] || { amount: 0, denom: 'stake' } // TODO

  if (!group) return <Loading />

  const { name, description, forumLink, updatedAt } = group.metadata

  return (
    <PageContainer>
      <Stack spacing={4}>
        <Flex justify="space-between">
          <Heading size="2xl">{name}</Heading>
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
          <Text fontSize="sm">{`Created ${formatDate(group.createdAt)}`}</Text>
        </Flex>
        {forumLink && (
          <Link href={forumLink}>
            <ChatIcon mr={3} />
            {'View discussion on group forum»'}
          </Link>
        )}

        <HStack spacing={4} pt={4}>
          <HStack align="baseline" spacing={2}>
            <Heading size="lg">{firstBalance.amount}</Heading>
            <Heading variant="label" size="sm">
              {firstBalance.denom}
            </Heading>
          </HStack>
          {balances && balances.length > 0 && (
            <Box flex={1} maxW="15rem">
              <SelectDropdown
                onChange={() => void null}
                label={`${Math.max(balances.length - 1, 0)} other tokens`}
                items={balances.map((b) => ({ label: b.denom, value: b.amount }))}
              />
            </Box>
          )}
        </HStack>
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
