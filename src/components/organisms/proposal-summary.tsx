import type { UIGroup, UIProposal, VoteOptionType } from 'types'
import { formatDate } from 'util/date'
import { VoteOption } from 'util/enums'

import { useColorModeValue } from 'hooks/chakra-hooks'

import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@/atoms'

import { VotesGraph } from './votes-graph'

import { BsSlashCircle, CheckIcon, CloseIcon, GoThumbsdown } from 'assets/tsx'

export const ProposalSummary = ({
  group,
  proposal,
  onVote,
}: {
  proposal: UIProposal
  group: UIGroup
  onVote: (option: VoteOptionType) => void
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
                <Button
                  leftIcon={<CheckIcon />}
                  colorScheme="green"
                  variant="outline"
                  onClick={() => onVote(VoteOption.VOTE_OPTION_YES)}
                >
                  Vote Yes
                </Button>
                <Button
                  leftIcon={<CloseIcon />}
                  colorScheme="red"
                  variant="outline"
                  onClick={() => onVote(VoteOption.VOTE_OPTION_NO)}
                >
                  Vote No
                </Button>
                <Button
                  leftIcon={<BsSlashCircle />}
                  colorScheme="yellow"
                  variant="outline"
                  onClick={() => onVote(VoteOption.VOTE_OPTION_ABSTAIN)}
                >
                  Abstain
                </Button>
                <Button
                  leftIcon={<GoThumbsdown />}
                  colorScheme="orange"
                  variant="outline"
                  onClick={() => onVote(VoteOption.VOTE_OPTION_NO_WITH_VETO)}
                >
                  Veto
                </Button>
              </SimpleGrid>
            )}
          </Stack>
        </CardBody>
      </Flex>
    </Card>
  )
}
