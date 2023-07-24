import { useEffect, useState } from 'react'

import { UIProposal } from 'types'
import { ProposalStatus } from 'util/enums'

function sortBySubmitTime(proposals: UIProposal[]) {
  return proposals.sort((a, b) => (a.submitTime! > b.submitTime! ? 1 : -1))
}

export function useDerivedProposals(
  proposals?: UIProposal[],
  historicalProposals?: UIProposal[],
) {
  const [accepted, setAccepted] = useState<UIProposal[]>([])
  const [submitted, setSubmitted] = useState<UIProposal[]>([])
  // const [rejected, setRejected] = useState<UIProposal[]>([])
  const [other, setOther] = useState<UIProposal[]>([])
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
      other.push(proposal)
    })
    setAccepted(sortBySubmitTime(accepted))
    // setRejected(rejected)
    setSubmitted(sortBySubmitTime(submitted))
    setOther(sortBySubmitTime(other))
  }, [proposals, historicalProposals])
  return { accepted, /* rejected, */ submitted, other }
}
