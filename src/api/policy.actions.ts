import Long from 'long'

import { GroupPolicyFormValues } from 'types'
import { throwError } from 'util/errors'
import { isJson } from 'util/validation'

import { Query } from 'store/query.store'
// import { fetchProposalsByGroupPolicy } from './proposal.actions'
import { signAndBroadcast } from 'store/wallet.store'

import { msgCreateGroupPolicy } from './policy.messages'
import { toUIGroupPolicy } from './policy.utils'

export async function createGroupPolicy(
  groupId: string,
  admin: string,
  values: GroupPolicyFormValues,
) {
  const msg = msgCreateGroupPolicy({ groupId, admin, values })
  const data = await signAndBroadcast([msg])
  if (!data) throwError('no data') // TODO replace with reusable string
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
