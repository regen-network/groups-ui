import type {
  ProposalSendFormValues,
  ProposalStakeFormValues,
  UIGroup,
  UIProposal,
  Vote,
  VoteOptionType,
} from 'types'
import { Any } from 'types'
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
import { SendReview, StakeReview } from '@/organisms/proposal-review'

import { VotesGraph } from './votes-graph'

export const ProposalSummary = ({
  group,
  onVote,
  proposal,
  userVote,
  votes,
}: {
  group: UIGroup
  onVote: (option: VoteOptionType) => void
  proposal: UIProposal
  userVote?: Vote
  votes?: Vote[]
}) => {
  const cardBgDark = useColorModeValue('gray.100', 'gray.700')
  const now = new Date()
  const votingClosed = new Date(proposal.votingPeriodEnd || now).getTime() < now.getTime()
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
            <Text>{proposal.metadata.summary}</Text>
            {proposal.messages.map((msg) =>
              renderMessage(msg, proposal.groupPolicyAddress),
            )}
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
                <VotesGraph votes={proposal.finalTallyResult || votes} />
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

function renderMessage(msg: Any, groupPolicyAddress: string) {
  if (!msg) return null
  switch (msg.typeUrl) {
    case '/cosmos.bank.v1beta1.MsgSend':
      return (
        <SendReview
          groupPolicyAddress={groupPolicyAddress}
          values={msg as unknown as ProposalSendFormValues}
        />
      )
    case '/cosmos.staking.v1beta1.MsgDelegate':
    case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
    case '/cosmos.staking.v1beta1.MsgUndelegate':
    case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
      return (
        <StakeReview
          groupPolicyAddress={groupPolicyAddress}
          values={msg as unknown as ProposalStakeFormValues}
        />
      )
    default:
      return null
  }
}
