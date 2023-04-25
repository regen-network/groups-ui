import Long from 'long'

import type {
  ProposalAction,
  UIProposal,
  UIProposalMetadata,
  VoteOptionType,
} from 'types'
import { logError, throwError } from 'util/errors'

import { Query } from 'store/query.store'
import { signAndBroadcast, Wallet } from 'store/wallet.store'

import { GroupMsgWithTypeUrl } from './cosmosgroups'
import { msgSubmitProposal } from './proposal.messages'
import { proposalActionsToMsgs, toUIProposal, toUIVote } from './proposal.utils'

export async function fetchProposalsByGroupPolicy(address?: string) {
  if (!Query.groups) throwError('Wallet not initialized')
  if (!address) throwError('Address is required')
  try {
    const { proposals } = await Query.groups.proposalsByGroupPolicy({ address })
    return proposals.map(toUIProposal)
  } catch (error) {
    throwError(error)
  }
}

export async function fetchProposalbyId(
  proposalId?: string | Long,
): Promise<UIProposal | null> {
  if (!Query.groups) throwError('Wallet not initialized')
  if (!proposalId) throwError('Proposal ID is required')
  try {
    const { proposal } = await Query.groups.proposal({
      proposalId:
        typeof proposalId === 'string' ? Long.fromString(proposalId) : proposalId,
    })
    return proposal ? toUIProposal(proposal) : null
  } catch (error) {
    throwError(error)
  }
}
export async function fetchVotesByProposal(proposalId?: string) {
  if (!Query.groups) throwError('Wallet not initialized')
  if (!proposalId) throwError('Proposal ID is required')
  try {
    const { votes } = await Query.groups.votesByProposal({
      proposalId: Long.fromString(proposalId),
    })
    return votes.map(toUIVote)
  } catch (error) {
    logError(error)
  }
}

export async function createProposal({
  actions,
  denom,
  groupPolicyAddress,
  metadata,
  proposers,
  summary,
  title,
}: {
  actions: ProposalAction[]
  denom: string
  groupPolicyAddress: string
  metadata: UIProposalMetadata
  proposers: string[]
  summary: string
  title: string
}) {
  try {
    const messages = proposalActionsToMsgs(actions, {
      denom,
      summary,
      title,
      groupPolicyAddress,
    })
    const submitMsg = msgSubmitProposal({
      groupPolicyAddress,
      messages,
      proposers,
      summary,
      title,
      metadata: JSON.stringify(metadata),
    })
    const data = await signAndBroadcast([submitMsg])
    if (!data) throwError('No data returned from transaction')
    let proposalId: string | undefined
    if (data.rawLog) {
      const [raw] = JSON.parse(data.rawLog)
      const idRaw = raw.events[0].attributes[0].value
      proposalId = String(JSON.parse(idRaw))
    }
    if (!proposalId) throwError('No data returned from transaction')
    return { ...data, proposalId }
  } catch (err) {
    logError(err)
  }
}

export async function voteOnProposal({
  option,
  proposalId,
}: {
  option: VoteOptionType
  proposalId: string
}) {
  if (!Wallet.account?.address) throwError('Wallet not initialized')
  try {
    const msg = GroupMsgWithTypeUrl.vote({
      option,
      proposalId: Long.fromString(proposalId),
      voter: Wallet.account.address,
      exec: 0, // EXEC_UNSPECIFIED
      metadata: '',
    })
    const data = await signAndBroadcast([msg])
    if (!data) throwError('No data returned from vote')
    return data
  } catch (err) {
    logError(err)
  }
}

export async function fetchVotesByAddress(address?: string) {
  if (!Query.groups) throwError('Wallet not initialized')
  if (!address) throwError('Address cannot be empty')
  try {
    const { votes } = await Query.groups.votesByVoter({ voter: address })
    return votes.map(toUIVote)
  } catch (error) {
    logError(error)
  }
}
