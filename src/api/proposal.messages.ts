// import { Exec } from '@regen-network/api/types/codegen/cosmos/group/v1/tx'
import type { Any } from 'types'

import { GroupMsgWithTypeUrl } from './cosmosgroups'

export function msgSubmitProposal({
  groupPolicyAddress,
  messages,
  metadata,
  proposers,
  exec = 0, // Exec.EXEC_UNSPECIFIED, TODO - TS doesn't import `Exec` correctly
}: {
  exec?: number // Exec
  groupPolicyAddress: string
  messages: Any[]
  metadata: string
  proposers: string[]
  summary: string
  title: string
}) {
  return GroupMsgWithTypeUrl.submitProposal({
    exec,
    groupPolicyAddress,
    messages,
    metadata,
    proposers,
  })
}
