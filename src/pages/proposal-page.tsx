import { redirect, useParams } from 'react-router-dom'

import { ROUTE_PATH } from 'routes'
import { useGroup, useProposal, useProposalVotes } from 'hooks/use-query'

import { Button, PageContainer, RouteLink, Stack } from '@/atoms'
import { Loading } from '@/molecules/loading'
import { ProposalDetails } from '@/organisms/proposal-details'
import { ProposalSummary } from '@/organisms/proposal-summary'

import { IoMdArrowBack } from 'assets/tsx'

export default function ProposalPage() {
  const { proposalId, groupId } = useParams()
  const { data: group, isLoading: isLoadingGroup } = useGroup(groupId)
  const { data: proposal, isLoading: isLoadingProposal } = useProposal(proposalId)
  const { data: votes, isLoading: isLoadingVotes } = useProposalVotes(proposalId)

  if (isLoadingProposal || isLoadingGroup || isLoadingVotes) return <Loading />
  if (!groupId || !proposal || !group) {
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
        <ProposalSummary proposal={proposal} group={group} />
        <ProposalDetails proposal={proposal} />
      </Stack>
    </PageContainer>
  )
}
