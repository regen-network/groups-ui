import type { Proposal } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

type ProposalMetadata = {
  title: string
  description?: string
}

export interface UIProposal extends Omit<Proposal, 'metadata'> {
  metadata: ProposalMetadata
}
