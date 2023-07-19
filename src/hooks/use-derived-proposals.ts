import { useEffect, useState } from 'react'
import { ProposalsByGroupPolicyAddressQuery } from 'generated/indexer-graphql'

import { UIProposal, UIProposalMetadata } from 'types'
import { ProposalStatus } from 'util/enums'

export function useDerivedProposals(
  proposals?: UIProposal[],
  proposalsByGroupPolicyAddressQuery?: ProposalsByGroupPolicyAddressQuery,
) {
  const [accepted, setAccepted] = useState<UIProposal[]>([])
  const [submitted, setSubmitted] = useState<UIProposal[]>([])
  // const [rejected, setRejected] = useState<UIProposal[]>([])
  const [other, setOther] = useState<UIProposal[]>([])
  const historicalProposals = proposalsByGroupPolicyAddressQuery?.allProposals?.nodes
  useEffect(() => {
    const accepted: UIProposal[] = []
    // const rejected: UIProposal[] = []
    const submitted: UIProposal[] = []
    const other: UIProposal[] = []
    proposals?.forEach((proposal) => {
      switch (proposal.status) {
        case ProposalStatus.PROPOSAL_STATUS_ACCEPTED:
          accepted.push(proposal)
          break
        // case ProposalStatus.PROPOSAL_STATUS_REJECTED:
        //   rejected.push(proposal)
        //   break
        case ProposalStatus.PROPOSAL_STATUS_SUBMITTED:
          submitted.push(proposal)
          break
        case ProposalStatus.PROPOSAL_STATUS_REJECTED:
        default:
          other.push(proposal)
          break
      }
    })
    historicalProposals?.forEach((proposal) => {
      if (proposal) {
        const executorResult =
          {
            PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED: 0,
            PROPOSAL_EXECUTOR_RESULT_NOT_RUN: 1,
            PROPOSAL_EXECUTOR_RESULT_SUCCESS: 2,
            PROPOSAL_EXECUTOR_RESULT_FAILURE: 3,
            UNRECOGNIZED: -1,
          }[proposal.executorResult] || -1
        const newProposal: UIProposal = {
          metadata: JSON.parse(proposal['metadata']) as UIProposalMetadata,
          executorResult,
          id: proposal.id,
          groupPolicyAddress: proposal.groupPolicyAddress,
          proposers: proposal.proposers as string[],
          groupVersion: proposal.groupVersion,
          groupPolicyVersion: proposal.groupPolicyVersion,
          status: ProposalStatus[proposal.status as keyof typeof ProposalStatus],
          finalTallyResult: proposal.finalTallyResult,
          messages: proposal.messages,
          submitTime: proposal.submitTime,
          votingPeriodEnd: proposal.votingPeriodEnd,
          historical: true,
        }
        other.push(newProposal)
      }
    })
    setAccepted(accepted.sort((a, b) => (a.submitTime! > b.submitTime! ? -1 : 1)))
    // setRejected(rejected)
    setSubmitted(submitted.sort((a, b) => (a.submitTime! > b.submitTime! ? -1 : 1)))
    setOther(other.sort((a, b) => (a.submitTime! > b.submitTime! ? -1 : 1)))
  }, [proposals, historicalProposals])
  return { accepted, /* rejected, */ submitted, other }
}
