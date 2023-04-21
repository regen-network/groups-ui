import type { Proposal } from '@haveanicedavid/regen-ts/types/codegen/cosmos/group/v1/types'

import type { SingleFormValues } from '@/organisms/send-single-form'
import type { ClaimFormValues } from '@/organisms/stake-claim-form'
import type { DelegateFormValues } from '@/organisms/stake-delegate-form'
import type { RedelegateFormValues } from '@/organisms/stake-redelegate-form'
export type {
  ProposalSDKType,
  ProposalStatus as ProposalStatusType,
  TallyResult,
  Vote,
  VoteOption as VoteOptionType,
  VoteSDKType,
} from '@haveanicedavid/regen-ts/types/codegen/cosmos/group/v1/types'

/** TODO: in v0.47, this data will live directly on a proposal */
export type UIProposalMetadata = {
  title: string
  summary: string
}

export interface UIProposal
  extends Omit<Proposal, 'votingPeriodEnd' | 'submitTime' | 'metadata'> {
  votingPeriodEnd?: Date
  submitTime?: Date
  metadata: UIProposalMetadata
}

export type ProposalAction = {
  /** for handling add / remove behavior + passing to nested forms for submit handler */
  id: string
  type: 'send' | 'stake' | 'text' // TODO: add other event types
  values: ProposalSendFormValues | ProposalStakeFormValues // TODO: types for other form actions
}

export type ProposalSendType = 'single' // TODO: "multi" send

export type ProposalSendFormValues = SingleFormValues // TODO: "multi" send

export type ProposalStakeType = 'delegate' | 'redelegate' | 'undelegate' | 'claim'

export type ProposalStakeFormValues =
  | DelegateFormValues
  | ClaimFormValues
  | RedelegateFormValues

// Re-export for convenience
export type { SingleFormValues }
export type { ClaimFormValues, DelegateFormValues, RedelegateFormValues }
export type { ProposalFormValues } from '@/organisms/proposal-form'
