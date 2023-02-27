import { useEffect, useState } from 'react'

import { UIProposal } from 'types'
import { ProposalStatus } from 'util/enums'

export function useDerivedProposals(proposals?: UIProposal[]) {
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
    setAccepted(accepted)
    // setRejected(rejected)
    setSubmitted(submitted)
    setOther(other)
  }, [proposals])
  return { accepted, /* rejected, */ submitted, other }
}
