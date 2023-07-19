import type { Proposal } from '@regen-network/api/types/codegen/cosmos/group/v1/types'

import type { UIProposalMetadata } from 'util/validation'

import type { SingleFormValues } from '@/organisms/send-single-form'
import type { ClaimFormValues } from '@/organisms/stake-claim-form'
import type { DelegateFormValues } from '@/organisms/stake-delegate-form'
import type { RedelegateFormValues } from '@/organisms/stake-redelegate-form'
import type { UndelegateFormValues } from '@/organisms/stake-undelegate-form'
import { DecisionPolicyFormValues } from '@/organisms/update-group-decision-policy-form'
import { MembersFormValues } from '@/organisms/update-group-members-form'
import { MetadataFormValues } from '@/organisms/update-group-metadata-form'
export type {
  ProposalSDKType,
  ProposalStatus as ProposalStatusType,
  TallyResult,
  Vote,
  VoteOption as VoteOptionType,
  VoteSDKType,
} from '@regen-network/api/types/codegen/cosmos/group/v1/types'

export interface UIProposal
  extends Omit<Proposal, 'votingPeriodEnd' | 'submitTime' | 'metadata'> {
  votingPeriodEnd?: Date
  submitTime?: Date
  historical?: boolean
  metadata: UIProposalMetadata
}

export type ProposalAction = {
  /** for handling add / remove behavior + passing to nested forms for submit handler */
  id: string
  type: 'send' | 'stake' | 'text' | 'update-group' // TODO: add other event types
  values: ProposalSendFormValues | ProposalStakeFormValues | ProposalUpdateGroupFormValues // TODO: types for other form actions
}

export type ProposalSendType = 'single' // TODO: "multi" send

export type ProposalSendFormValues = SingleFormValues // TODO: "multi" send

export type ProposalStakeType = 'delegate' | 'redelegate' | 'undelegate' | 'claim'

export type ProposalStakeFormValues =
  | DelegateFormValues
  | ClaimFormValues
  | RedelegateFormValues
  | UndelegateFormValues

export type ProposalUpdateGroupType = 'decision-policy' | 'members' | 'metadata'
export type ProposalUpdateGroupFormValues =
  | DecisionPolicyFormValues
  | MembersFormValues
  | MetadataFormValues

// Re-export for convenience
export type { SingleFormValues }
export type {
  ClaimFormValues,
  DelegateFormValues,
  RedelegateFormValues,
  UndelegateFormValues,
}

/** TODO: in v0.47, this data will live directly on a proposal */
export type { UIProposalMetadata }
export type { ProposalFormValues } from '@/organisms/proposal-form'
