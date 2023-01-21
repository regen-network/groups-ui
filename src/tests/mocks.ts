import Long from 'long'

import type { ProposalStatusType, UIProposal } from 'types'

import { ProposalStatus } from 'api/proposal.utils'

const baseDate = new Date('2021-07-01T00:00:00Z')

export function mockProposal(
  i: number,
  status: ProposalStatusType = ProposalStatus.PROPOSAL_STATUS_SUBMITTED,
): UIProposal {
  return {
    status,
    id: new Long(i),
    submitTime: new Date(baseDate.getTime() + i * 1000),
    metadata: {
      title: `Proposal ${i}`,
      description: `Proposal ${i} description`,
    },
  } as UIProposal // TODO other properties
}
