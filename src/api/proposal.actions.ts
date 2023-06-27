import { Event } from '@regen-network/api/types/codegen/tendermint/abci/types'
import Long from 'long'

import type {
  ProposalAction,
  UIProposal,
  UIProposalMetadata,
  VoteOptionType,
} from 'types'
import { throwError } from 'util/errors'
import { isJson } from 'util/validation'

import { Query } from 'store/query.store'
import { signAndBroadcast, Wallet } from 'store/wallet.store'

import { txError } from './api.constants'
import { GroupMsgWithTypeUrl } from './cosmosgroups'
import { msgSubmitProposal } from './proposal.messages'
import { proposalActionsToMsgs, toUIProposal, toUIVote } from './proposal.utils'

export async function fetchProposalsByGroupPolicy(address?: string) {
  if (!Query.groups) throwError('Wallet not initialized')
  if (!address) throwError('Address is required')
  try {
    const { proposals } = await Query.groups.proposalsByGroupPolicy({ address })
    return Promise.all(proposals.map(toUIProposal))
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
    throwError(error)
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
  console.log(submitMsg)
  const data = await signAndBroadcast([submitMsg])
  if (!data) throwError(txError)
  let proposalId: string | undefined
  if (data.rawLog && isJson(data.rawLog)) {
    const [raw] = JSON.parse(data.rawLog)
    const idRaw = raw.events.find(
      (e: Event) => e.type === 'cosmos.group.v1.EventSubmitProposal',
    ).attributes[0].value
    proposalId = String(JSON.parse(idRaw))
  }
  if (!proposalId) throwError(txError)
  return { ...data, proposalId }
}

export async function executeProposal({ proposalId }: { proposalId: Long }) {
  if (!Wallet.account?.address) throwError('Wallet not initialized')
  const msg = GroupMsgWithTypeUrl.exec({
    proposalId,
    executor: Wallet.account.address,
  })
  const data = await signAndBroadcast([msg])
  if (!data) throwError(txError)
  return data
}

export async function voteOnProposal({
  option,
  proposalId,
}: {
  option: VoteOptionType
  proposalId: string
}) {
  if (!Wallet.account?.address) throwError('Wallet not initialized')
  const msg = GroupMsgWithTypeUrl.vote({
    option,
    proposalId: Long.fromString(proposalId),
    voter: Wallet.account.address,
    exec: 0, // EXEC_UNSPECIFIED
    metadata: '',
  })
  const data = await signAndBroadcast([msg])
  if (!data) throwError(txError)
  return data
}

export async function fetchVotesByAddress(address?: string) {
  if (!Query.groups) throwError('Wallet not initialized')
  if (!address) throwError('Address cannot be empty')
  try {
    const { votes } = await Query.groups.votesByVoter({ voter: address })
    return votes.map(toUIVote)
  } catch (error) {
    throwError(error)
  }
}
