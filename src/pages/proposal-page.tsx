import { redirect, useParams } from 'react-router-dom'

import { ROUTE_PATH } from 'routes'
import { useColorModeValue } from 'hooks/chakra-hooks'
import { useGroup, useProposal } from 'hooks/use-query'

import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  PageContainer,
  RouteLink,
  SimpleGrid,
  Stack,
  Text,
} from '@/atoms'
import { Loading } from '@/molecules/loading'

import { IoMdArrowBack } from 'assets/tsx'

// const StakingMsgInfo = () => {
//   return (
//     <Card variant="filled">
//       <CardHeader></CardHeader>
//     </Card>
//   )
// }

export default function ProposalPage() {
  const { proposalId, groupId } = useParams()
  const { data: group, isLoading: isLoadingGroup } = useGroup(groupId)
  const { data: proposal, isLoading: isLoadingProposal } = useProposal(proposalId)
  const cardBgDark = useColorModeValue('gray.100', 'gray.600')

  if (isLoadingProposal || isLoadingGroup) return <Loading />
  if (!groupId || !proposal) {
    redirect(groupId ? ROUTE_PATH.group(groupId) : ROUTE_PATH.groups)
    return null
  }

  return (
    <PageContainer>
      <Stack w="full" spacing={6}>
        <div>
          <Button
            variant="ghost"
            leftIcon={<IoMdArrowBack />}
            as={RouteLink}
            to={ROUTE_PATH.group(groupId)}
          >
            {group?.metadata.name}
          </Button>
        </div>
        <Card variant="elevated">
          <Flex>
            <CardBody>
              <Stack>
                <Heading>{proposal?.metadata.title}</Heading>
                <Text>{proposal?.metadata.description}</Text>
              </Stack>
            </CardBody>
            <CardBody bg={cardBgDark} borderRightRadius="lg">
              <Stack spacing={8}>
                <Flex align="baseline">
                  <Heading size="md">Voting Group:</Heading>
                  <Text ml={2}>{group?.metadata.name}</Text>
                </Flex>
                <SimpleGrid columns={2} gap={3} columnGap={4}>
                  <Button colorScheme="green" variant="outline">
                    Yes
                  </Button>
                  <Button colorScheme="red" variant="outline">
                    No
                  </Button>
                  <Button colorScheme="yellow" variant="outline">
                    Abstain
                  </Button>
                  <Button colorScheme="orange" variant="outline">
                    Veto
                  </Button>
                </SimpleGrid>
              </Stack>
            </CardBody>
          </Flex>
        </Card>
      </Stack>
    </PageContainer>
  )
}
