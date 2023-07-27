import type { ProposalStatusType, VoteOptionType } from 'types'

/**
 * TODO: the generated `ProposalStatus` enum returns number values, but the
 * actual API response is the keys of those values. We also can't import that
 * enum directly because of a combo of vite and the generated code - this is a
 * copy-pasted version of the enum from the SDK, converted to a normal object,
 * used to generate an equivalent a second object with the correct values
 */
const GeneratedProposalStatus: typeof ProposalStatusType = {
  /** PROPOSAL_STATUS_UNSPECIFIED - An empty value is invalid and not allowed. */
  PROPOSAL_STATUS_UNSPECIFIED: 0,
  /** PROPOSAL_STATUS_SUBMITTED - Initial status of a proposal when submitted. */
  PROPOSAL_STATUS_SUBMITTED: 1,
  /**
   * PROPOSAL_STATUS_ACCEPTED - Final status of a proposal when the final tally is done and the outcome
   * passes the group policy's decision policy.
   */
  PROPOSAL_STATUS_ACCEPTED: 2,
  /**
   * PROPOSAL_STATUS_REJECTED - Final status of a proposal when the final tally is done and the outcome
   * is rejected by the group policy's decision policy.
   */
  PROPOSAL_STATUS_REJECTED: 3,
  /**
   * PROPOSAL_STATUS_ABORTED - Final status of a proposal when the group policy is modified before the
   * final tally.
   */
  PROPOSAL_STATUS_ABORTED: 4,
  /**
   * PROPOSAL_STATUS_WITHDRAWN - A proposal can be withdrawn before the voting start time by the owner.
   * When this happens the final status is Withdrawn.
   */
  PROPOSAL_STATUS_WITHDRAWN: 5,
  UNRECOGNIZED: -1,
}

/** TODO: VoteOption won't properly import into vite as an export directly from
 * the generated lib - this is copy-pasted */
export const VoteOption: typeof VoteOptionType = {
  /**
   * VOTE_OPTION_UNSPECIFIED - VOTE_OPTION_UNSPECIFIED defines an unspecified vote option which will
   * return an error.
   */
  VOTE_OPTION_UNSPECIFIED: 0,
  /** VOTE_OPTION_YES - VOTE_OPTION_YES defines a yes vote option. */
  VOTE_OPTION_YES: 1,
  /** VOTE_OPTION_ABSTAIN - VOTE_OPTION_ABSTAIN defines an abstain vote option. */
  VOTE_OPTION_ABSTAIN: 2,
  /** VOTE_OPTION_NO - VOTE_OPTION_NO defines a no vote option. */
  VOTE_OPTION_NO: 3,
  /** VOTE_OPTION_NO_WITH_VETO - VOTE_OPTION_NO_WITH_VETO defines a no with veto vote option. */
  VOTE_OPTION_NO_WITH_VETO: 4,
  UNRECOGNIZED: -1,
}

export const ProposalStatus: typeof ProposalStatusType = Object.keys(
  GeneratedProposalStatus,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
).reduce((acc: any, key: string) => {
  acc[key] = key
  return acc
}, {} as typeof ProposalStatusType)

export const getExecutorResultCode = (executorResult: string) => {
  const code = (function () {
    switch (executorResult) {
      case 'PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED':
        return 0
      case 'PROPOSAL_EXECUTOR_RESULT_NOT_RUN':
        return 1
      case 'PROPOSAL_EXECUTOR_RESULT_SUCCESS':
        return 2
      case 'PROPOSAL_EXECUTOR_RESULT_FAILURE':
        return 3
      default:
        return -1
    }
  })()
  return code
}
