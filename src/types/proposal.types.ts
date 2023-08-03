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
  metadata: UIProposalMetadata
  historical?: boolean
}

export type ProposalAction = {
  /** for handling add / remove behavior + passing to nested forms for submit handler */
  id: string
  type: 'send' | 'stake' | 'text' | 'update-group'
  values: ProposalSendFormValues | ProposalStakeFormValues | ProposalUpdateGroupFormValues
}

export type ProposalSendType = 'single'

export type ProposalSendFormValues = SingleFormValues

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

/** TODO(#72): in v0.47, this data will live directly on a proposal */
export type { UIProposalMetadata }
export type { ProposalFormValues } from '@/organisms/proposal-form'
