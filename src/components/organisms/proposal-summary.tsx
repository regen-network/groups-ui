import type {
  ProposalSendFormValues,
  ProposalStakeFormValues,
  UIGroup,
  UIProposal,
  Vote,
  VoteOptionType,
} from 'types'
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
import { JSONDisplay } from '@/molecules/json-display'
import { SendReview } from '@/molecules/proposal-send-review'
import { StakeReview } from '@/molecules/proposal-stake-review'
import { VoteButtons } from '@/molecules/vote-buttons'

import { VotesGraph } from './votes-graph'

export const ProposalSummary = ({
  group,
  onVote,
  proposal,
  userVote,
  votes,
  votingClosed,
}: {
  group: UIGroup
  onVote?: (option: VoteOptionType) => void
  proposal: UIProposal
  userVote?: Vote
  votes?: Vote[]
  votingClosed?: boolean
}) => {
  const cardBgDark = useColorModeValue('gray.100', 'gray.700')
  const proposalFinalized =
    proposal.status.toString() === 'PROPOSAL_STATUS_ACCEPTED' ||
    proposal.status.toString() === 'PROPOSAL_STATUS_REJECTED'
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
              <Badge colorScheme={proposalFinalized ? 'red' : 'orange'} variant="outline">
                {proposalFinalized ? 'Finalized' : 'Unfinalized'}
              </Badge>
            </Stack>
            <Heading>{proposal.metadata.title}</Heading>
            <Text>{proposal.metadata.summary}</Text>
            {proposal.messages.map((msg, index) =>
              renderMessage(msg, proposal.groupPolicyAddress, index),
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

// TODO: https://github.com/regen-network/regen-js/issues/71
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderMessage(msg: any, groupPolicyAddress: string, index: number) {
  if (!msg) return null
  switch (msg.typeUrl) {
    case '/cosmos.bank.v1beta1.MsgSend':
      return (
        <SendReview
          key={index}
          groupPolicyAddress={groupPolicyAddress}
          values={
            {
              ...msg,
              sendType: 'single',
              // TODO(#80): support multiple coins
              amount: msg.value['amount'][0]['amount'],
              denom: msg.value['amount'][0]['denom'],
            } as unknown as ProposalSendFormValues
          }
        />
      )
    case '/cosmos.staking.v1beta1.MsgDelegate':
      return (
        <StakeReview
          key={index}
          groupPolicyAddress={groupPolicyAddress}
          values={
            {
              ...msg,
              stakeType: 'delegate',
              amount: msg.value['amount']['amount'],
              denom: msg.value['amount']['denom'],
            } as unknown as ProposalStakeFormValues
          }
        />
      )
    case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
      return (
        <StakeReview
          key={index}
          groupPolicyAddress={groupPolicyAddress}
          values={
            {
              ...msg,
              stakeType: 'redelegate',
              amount: msg.value['amount']['amount'],
              denom: msg.value['amount']['denom'],
            } as unknown as ProposalStakeFormValues
          }
        />
      )
    case '/cosmos.staking.v1beta1.MsgUndelegate':
      return (
        <StakeReview
          key={index}
          groupPolicyAddress={groupPolicyAddress}
          values={
            {
              ...msg,
              stakeType: 'undelegate',
              amount: msg.value['amount']['amount'],
              denom: msg.value['amount']['denom'],
            } as unknown as ProposalStakeFormValues
          }
        />
      )
    case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
      return (
        <StakeReview
          key={index}
          groupPolicyAddress={groupPolicyAddress}
          values={
            {
              ...msg,
              stakeType: 'claim',
              validator: msg.value['validator_address'],
            } as unknown as ProposalStakeFormValues
          }
        />
      )
    default:
      return <JSONDisplay key={index} data={msg} />
  }
}
