import { FragmentType, getFragmentData } from 'gql'
import { ProposalItemFragmentDoc } from 'gql/graphql'

import { UIProposal, UIProposalMetadata } from 'types'
import { ProposalStatus } from 'util/enums'

export function nodeToUIProposal(node: FragmentType<typeof ProposalItemFragmentDoc>) {
  const proposal = getFragmentData(ProposalItemFragmentDoc, node)
  if (!proposal) return null
  const executorResult =
    {
      PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED: 0,
      PROPOSAL_EXECUTOR_RESULT_NOT_RUN: 1,
      PROPOSAL_EXECUTOR_RESULT_SUCCESS: 2,
      PROPOSAL_EXECUTOR_RESULT_FAILURE: 3,
      UNRECOGNIZED: -1,
    }[proposal.executorResult] || -1
  const uiProposal: UIProposal = {
    metadata: JSON.parse(proposal.metadata) as UIProposalMetadata,
    executorResult,
    id: proposal.id,
    groupPolicyAddress: proposal.groupPolicyAddress,
    proposers: proposal.proposers as string[],
    groupVersion: proposal.groupVersion,
    groupPolicyVersion: proposal.groupPolicyVersion,
    status: ProposalStatus[proposal.status as keyof typeof ProposalStatus],
    finalTallyResult: {
      yesCount: proposal.finalTallyResult.yes_count,
      noCount: proposal.finalTallyResult.no_count,
      abstainCount: proposal.finalTallyResult.abstain_count,
      noWithVetoCount: proposal.finalTallyResult.no_with_veto_count,
    },
    messages: proposal.messages,
    submitTime: proposal.submitTime,
    votingPeriodEnd: proposal.votingPeriodEnd,
    historical: true,
  }
  return uiProposal
}
