// import { Exec } from '@regen-network/api/types/codegen/cosmos/group/v1/tx'
// import type { MsgSubmitProposalEncoded } from '@regen-network/api/types/codegen/cosmos/group/v1/tx'
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

  // NOTE: We use the encoded msg type to support amino signing with nested types.
  // See https://github.com/osmosis-labs/telescope/issues/281
  // const encodedMsg: MsgSubmitProposalEncoded = {
  //   exec,
  //   groupPolicyAddress,
  //   messages,
  //   metadata,
  //   proposers,
  // }
  //
  // return {
  //   typeUrl: '/cosmos.group.v1.MsgSubmitProposal',
  //   value: encodedMsg,
  // }
}
