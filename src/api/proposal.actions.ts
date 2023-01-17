import type { ProposalAction, UIProposalMetadata } from 'types'
import { handleError, throwError } from 'util/errors'

import { Query, signAndBroadcast } from 'store'

import { msgSubmitProposal } from './proposal.messages'
import { proposalActionsToMsgs } from './proposal.utils'

export async function fetchProposalsByGroupPolicy(address?: string) {
  if (!Query.groups) throwError('Wallet not initialized')
  if (!address) throwError('Address is required')
  try {
    const { proposals } = await Query.groups.proposalsByGroupPolicy({ address })
    return proposals
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
