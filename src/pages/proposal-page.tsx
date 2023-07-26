import { redirect, useParams } from 'react-router-dom'

import { VoteOptionType } from 'types'
import { throwError } from 'util/errors'

import { ROUTE_PATH } from 'routes'
import { voteOnProposal } from 'api/proposal.actions'
import {
  useGroup,
  useGroupMembers,
  useHistoricalProposal,
  useProposal,
  useProposalVotes,
  useUserVotes,
} from 'hooks/use-query'
import { useTxToasts } from 'hooks/use-toasts'

import { Button, PageContainer, RouteLink, Stack } from '@/atoms'
import { Loading } from '@/molecules/loading'
import { ProposalDetails } from '@/organisms/proposal-details'
import { ProposalFinalTallyTable } from '@/organisms/proposal-final-tally-table'
import { ProposalSummary } from '@/organisms/proposal-summary'
import { ProposalVotesTable } from '@/organisms/proposal-votes-table'

import { BackIcon } from 'assets/tsx'

export default function ProposalPage() {
  const { toastErr, toastSuccess } = useTxToasts()
  const { proposalId, groupId } = useParams()
  const { data: group, isLoading: isLoadingGroup } = useGroup(groupId)
  const { data: groupMembers } = useGroupMembers(groupId)
  const { data: historicalProposal, isLoading: isLoadingHistoricalProposal } =
    useHistoricalProposal(proposalId)

  const { data: proposal, isLoading: isLoadingProposal } = useProposal(
    proposalId,
    !isLoadingHistoricalProposal && !historicalProposal?.historical,
  )

  const {
    data: votes,
    isLoading: isLoadingVotes,
    refetch: refetchVotes,
  } = useProposalVotes(proposalId)

  const {
    data: userVotes,
    refetch: refetchUserVotes,
    isLoading: isLoadingUserVotes,
  } = useUserVotes()

  if (!groupId) {
    redirect(groupId ? ROUTE_PATH.group(groupId) : ROUTE_PATH.groups)
    return null
  }

  if (
    !!historicalProposal &&
    !!group &&
    !isLoadingGroup &&
    !isLoadingHistoricalProposal
  ) {
    const { finalTallyResult } = historicalProposal
    return (
      <PageContainer>
        <Stack w="full" spacing={6}>
          <div>
            <Button
              variant="ghost"
              leftIcon={<BackIcon />}
              as={RouteLink}
              to={ROUTE_PATH.group(groupId)}
            >
              {group?.metadata.name}
            </Button>
          </div>
          <ProposalSummary
            onVote={() => undefined}
            proposal={historicalProposal}
            group={group}
          />
          <ProposalDetails proposal={historicalProposal} />
          <ProposalFinalTallyTable finalTallyResult={finalTallyResult} />
        </Stack>
      </PageContainer>
    )
  }

  if (isLoadingGroup || isLoadingProposal || isLoadingVotes || isLoadingUserVotes)
    return <Loading />

  async function handleVote(option: VoteOptionType) {
    if (!proposalId) throwError('Proposal ID is required to cast vote')
    try {
      const { transactionHash } = await voteOnProposal({ proposalId, option })
      toastSuccess(transactionHash)
      refetchVotes()
      refetchUserVotes()
    } catch (err) {
      toastErr(err)
    }
  }

  const userVote = userVotes
    ? userVotes.find((v) => v.proposalId.toString() === proposalId)
    : undefined

  if (!proposal) {
    throwError('Proposal not found')
  }
  if (!group) {
    throwError('Group not found')
  }
  return (
    <PageContainer>
      <Stack w="full" spacing={6}>
        <div>
          <Button
            variant="ghost"
            leftIcon={<BackIcon />}
            as={RouteLink}
            to={ROUTE_PATH.group(groupId)}
          >
            {group?.metadata.name}
          </Button>
        </div>
        <ProposalSummary
          proposal={proposal}
          group={group}
          onVote={handleVote}
          userVote={userVote}
          votes={votes}
        />
        <ProposalDetails proposal={proposal} />
        <ProposalVotesTable votes={votes || []} groupMembers={groupMembers || []} />
      </Stack>
    </PageContainer>
  )
}
