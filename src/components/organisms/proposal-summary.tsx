import type { UIGroup, UIProposal, Vote, VoteOptionType } from 'types'
import { formatDate } from 'util/date'
import { VoteOption } from 'util/enums'

import { useColorModeValue } from 'hooks/chakra-hooks'

import {
  Badge,
  Box,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@/atoms'
import { VoteButtons } from '@/molecules/vote-buttons'

import { VotesGraph } from './votes-graph'

export const ProposalSummary = ({
  group,
  onVote,
  proposal,
  userVote,
}: {
  group: UIGroup
  onVote: (option: VoteOptionType) => void
  proposal: UIProposal
  userVote?: Vote
}) => {
  const cardBgDark = useColorModeValue('gray.100', 'gray.700')
  const votingClosed =
    new Date(proposal.votingPeriodEnd || new Date()).getTime() < new Date().getTime()
  return (
    <Card>
      <Flex>
        <CardBody>
          <Stack>
            <Stack direction="row">
              {/* id */}
              <Badge>#{proposal.id.toString()}</Badge>
              {/* status */}
              <Badge variant="outline">#{proposal.status.toString()}</Badge>
              <Badge colorScheme={votingClosed ? 'red' : 'orange'} variant="outline">
                {votingClosed ? 'Finalized' : 'Unfinalized'}
              </Badge>
            </Stack>
            <Heading>{proposal.metadata.title}</Heading>
            <Text>{proposal.metadata.description || '-'}</Text>
          </Stack>
        </CardBody>
        <CardBody bg={cardBgDark} borderRightRadius="lg">
          <Stack spacing={8}>
            <Flex align="baseline">
              <Heading size="md">Voting Group:</Heading>
              <Text ml={2}>{group.metadata.name}</Text>
            </Flex>
            <Text>
              {`Voting ${votingClosed ? 'closed' : 'closes'} ${formatDate(
                proposal.votingPeriodEnd,
                'long',
              )}`}
            </Text>
            <Center>
              <Box maxW={220}>
                <VotesGraph />
              </Box>
            </Center>
            {!votingClosed && (
              <SimpleGrid columns={2} gap={3} columnGap={4}>
                <VoteButtons
                  onVote={onVote}
                  userVote={
                    userVote?.option
                      ? (VoteOption[userVote.option] as unknown as VoteOptionType)
                      : undefined
                  }
                />
              </SimpleGrid>
            )}
          </Stack>
        </CardBody>
      </Flex>
    </Card>
  )
}
