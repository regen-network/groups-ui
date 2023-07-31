// NOTE: importing from src rather than types resolves an import issue
// with types most likely related to typescript errors upstream.
// TODO: https://github.com/regen-network/regen-js/issues/84
import { Exec } from '@regen-network/api/src/codegen/cosmos/group/v1/tx'

import type { Any } from 'types'

import { GroupMsgWithTypeUrl } from './cosmosgroups'

export function msgSubmitProposal({
  groupPolicyAddress,
  messages,
  metadata,
  proposers,
  exec = Exec.EXEC_UNSPECIFIED,
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
