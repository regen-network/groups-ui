import { useState } from 'react'
import { redirect, useParams } from 'react-router-dom'
import Long from 'long'

import { VoteOptionType } from 'types'
import { throwError } from 'util/errors'

import { ROUTE_PATH } from 'routes'
import { executeProposal, voteOnProposal } from 'api/proposal.actions'
import {
  useGroup,
  useGroupMembers,
  useProposal,
  useProposalVotes,
  useUserVotes,
} from 'hooks/use-query'
import { useTxToasts } from 'hooks/use-toasts'

import { Button, PageContainer, RouteLink, Stack } from '@/atoms'
import {
  FormFooter,
  FormSubmitHiddenButton,
  useFormFooter,
} from '@/molecules/form-footer'
import { Loading } from '@/molecules/loading'
import { ProposalDetails } from '@/organisms/proposal-details'
import { ProposalSummary } from '@/organisms/proposal-summary'
import { ProposalVotesTable } from '@/organisms/proposal-votes-table'

import { ProposalStatus } from '../util/enums'

import { BackIcon } from 'assets/tsx'

export default function ProposalPage() {
  const { toastErr, toastSuccess } = useTxToasts()
  const { proposalId, groupId } = useParams()
  const { data: group, isLoading: isLoadingGroup } = useGroup(groupId)
  const { data: groupMembers } = useGroupMembers(groupId)
  const {
    data: proposal,
    isLoading: isLoadingProposal,
    refetch: refetchProposal,
  } = useProposal(proposalId)
  const {
    data: votes,
    isLoading: isLoadingVotes,
    refetch: refetchVotes,
  } = useProposalVotes(proposalId)
  const [submitting, setSubmitting] = useState(false)

  useFormFooter({
    onNext: undefined,
    onPrev: undefined,
    btnText: 'Execute',
  })

  const {
    data: userVotes,
    refetch: refetchUserVotes,
    isLoading: isLoadingUserVotes,
  } = useUserVotes()

  if (isLoadingProposal || isLoadingGroup || isLoadingVotes || isLoadingUserVotes)
    return <Loading />
  if (!groupId || !proposal || !group) {
    redirect(groupId ? ROUTE_PATH.group(groupId) : ROUTE_PATH.groups)
    return null
  }

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

  async function handleExec(event) {
    event.preventDefault()
    setSubmitting(true)
    if (!proposalId) throwError('Proposal ID is required to execute proposal')
    try {
      const { transactionHash } = await executeProposal({
        proposalId: Long.fromString(proposalId),
      })
      toastSuccess(transactionHash)
      refetchProposal()
    } catch (err) {
      toastErr(err)
    }
    setSubmitting(false)
  }

  const userVote = userVotes
    ? userVotes.find((v) => v.proposalId.toString() === proposalId)
    : undefined

  const isExecutable = proposal.status === ProposalStatus.PROPOSAL_STATUS_ACCEPTED

  return (
    <>
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
      {isExecutable && (
        <form onSubmit={handleExec}>
          <FormSubmitHiddenButton id="proposal-exec" onSubmit={handleExec} />
        </form>
      )}
      <FormFooter isSubmitting={submitting} />
    </>
  )
}
