import { cosmos } from '@haveanicedavid/cosmos-groups-ts'

// import { Exec } from '@haveanicedavid/cosmos-groups-ts/types/codegen/cosmos/group/v1/tx'
import type { Any } from 'types'

import { GroupMsgWithTypeUrl } from './cosmosgroups'

export function msgSubmitProposal({
  groupPolicyAddress,
  messages,
  proposers,
  metadata,
  exec = 0, // Exec.EXEC_UNSPECIFIED, TODO - TS doesn't import `Exec` correctly
}: {
  exec?: number // Exec
  groupPolicyAddress: string
  messages: Any[]
  proposers: string[]
  metadata: string
}) {
  return GroupMsgWithTypeUrl.submitProposal({
    exec,
    groupPolicyAddress,
    messages,
    proposers,
    metadata,
  })
}

export function msgTextProposal({
  title,
  description,
}: {
  title: string
  description: string
}): Any {
  const value = cosmos.gov.v1beta1.TextProposal.encode({ title, description }).finish()
  // doesn't seem to be a `withTypeUrl` method for gov
  return {
    value,
    typeUrl: '/cosmos.gov.v1beta1.TextProposal',
  }
}
