import Long from 'long'

import type { ProposalAction, UIProposal, UIProposalMetadata } from 'types'
import { handleError, throwError } from 'util/errors'

import { Query } from 'store/query.store'
import { signAndBroadcast } from 'store/wallet.store'

import { msgSubmitProposal } from './proposal.messages'
import { proposalActionsToMsgs, toUIProposal } from './proposal.utils'

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
    return votes
  } catch (error) {
    handleError(error)
  }
}

export async function createProposal({
  actions,
  denom,
  groupPolicyAddress,
  metadata,
  proposers,
}: {
  actions: ProposalAction[]
  denom: string
  groupPolicyAddress: string
  metadata: UIProposalMetadata
  proposers: string[]
}) {
  try {
    const messages = proposalActionsToMsgs(actions, {
      denom,
      description: metadata.description || '',
      title: metadata.title,
      groupPolicyAddress,
    })
    const submitMsg = msgSubmitProposal({
      groupPolicyAddress,
      messages,
      proposers,
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
  } catch (error) {
    handleError(error)
  }
}
