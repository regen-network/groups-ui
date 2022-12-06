import { throwError } from 'util/errors'

import { Query } from 'store'

export async function fetchProposalsByGroupPolicy(address?: string) {
  if (!Query.groups) throwError('Wallet not initialized')
  if (!address) throwError('Address is required')
  try {
    const { proposals } = await Query.groups.proposalsByGroupPolicy({ address })
    console.log('proposals :>> ', proposals)
    return proposals
  } catch (error) {
    throwError(error)
  }
}
