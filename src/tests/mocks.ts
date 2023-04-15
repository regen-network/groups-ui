import Long from 'long'

import type { ProposalStatusType, UIProposal } from 'types'
import { ProposalStatus } from 'util/enums'

const baseDate = new Date('2021-07-01T00:00:00Z')
// User2 from dev setup
const DEFAULT_ADDRESS = 'cosmos106ljn6kds9vegaux0w4jnend97fdm50yec59vq'

export function mockProposal(
  i: number,
  status: ProposalStatusType = ProposalStatus.PROPOSAL_STATUS_SUBMITTED,
): UIProposal {
  const d = new Date(baseDate.getTime() + i * 1000)
  return {
    status,
    id: new Long(i),
    submitTime: d,
    executorResult: 'TODO' as never,
    groupPolicyAddress: 'TODO',
    groupPolicyVersion: Long.fromNumber(i),
    groupVersion: Long.fromNumber(i),
    messages: [],
    proposers: [DEFAULT_ADDRESS],
    metadata: {
      title: `Proposal ${i}`,
      summary: `Proposal ${i} summary`,
    },
  }
}
