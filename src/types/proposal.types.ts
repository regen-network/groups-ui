import type { Proposal } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

import type { TextProposalFormValues as ProposalTextFormValues } from '@/organisms/proposal-text-form'
import type { ClaimFormValues } from '@/organisms/stake-claim-form'
import type { DelegateFormValues } from '@/organisms/stake-delegate-form'
import type { RedelegateFormValues } from '@/organisms/stake-redelegate-form'

export type {
  ProposalSDKType,
  ProposalStatus as ProposalStatusType,
} from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/types'

export type UIProposalMetadata = {
  title: string
  description?: string
}

export interface UIProposal extends Omit<Proposal, 'metadata'> {
  metadata: UIProposalMetadata
}

export type ProposalAction = {
  /** for handling add / remove behavior + passing to nested forms for submit handler */
  id: string
  type: 'stake' | 'text' // | 'spend' // TODO: add other event types
  values: ProposalStakeFormValues | ProposalTextFormValues
}

export type ProposalStakeType = 'delegate' | 'redelegate' | 'undelegate' | 'claim'

export type ProposalStakeFormValues =
  | DelegateFormValues
  | ClaimFormValues
  | RedelegateFormValues

// Re-export for convenience
export type {
  ClaimFormValues,
  DelegateFormValues,
  ProposalTextFormValues,
  RedelegateFormValues,
}
export type { ProposalFormValues } from '@/organisms/proposal-form'
