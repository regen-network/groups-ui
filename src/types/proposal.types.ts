import type { Proposal } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

type ProposalMetadata = {
  title: string
  description?: string
}

export interface UIProposal extends Omit<Proposal, 'metadata'> {
  metadata: ProposalMetadata
}

export type ProposalStakeType = 'delegate' | 'redelegate' | 'undelegate' | 'claim'
export type ProposalEventType = 'stake' | 'text' // | 'spend' // TODO: add rest

export type DelegateFormValues = {
  validator: string
  amount: string
}
