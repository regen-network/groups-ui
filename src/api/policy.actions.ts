import Long from 'long'

import { throwError } from 'util/errors'
import { isJson } from 'util/validation'

import { Query } from 'store/query.store'
// import { fetchProposalsByGroupPolicy } from './proposal.actions'
import { signAndBroadcast } from 'store/wallet.store'

import { txError } from './api.constants'
import { CreateGroupPolicyValues, msgCreateGroupPolicy } from './policy.messages'
import { toUIGroupPolicy } from './policy.utils'

export async function createGroupPolicy(values: CreateGroupPolicyValues) {
  const msg = msgCreateGroupPolicy(values)
  const data = await signAndBroadcast([msg])
  if (!data) throwError(txError)
  let policyAddress
  if (data.rawLog && isJson(data.rawLog)) {
    const [raw] = JSON.parse(data.rawLog)
    const addrRaw = raw.events.find(
      (e: Event) => e.type === 'cosmos.group.v1.EventCreateGroupPolicy',
    ).attributes[0].value
    policyAddress = String(JSON.parse(addrRaw))
  }
  return { ...data, policyAddress }
}

export async function fetchGroupPolicies(groupId?: string | Long) {
  if (!Query.groups) throwError('Wallet not initialized')
  if (!groupId) throwError('groupId is required')
  try {
    const { group_policies } = await Query.groups.groupPoliciesByGroup({
      groupId: groupId instanceof Long ? groupId : Long.fromString(groupId),
    })
    return group_policies.map(toUIGroupPolicy)
  } catch (error) {
    throwError(error)
  }
}
