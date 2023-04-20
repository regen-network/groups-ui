import type { IconType } from 'react-icons'

import type { ProposalAction } from 'types'

import { CgListTree } from 'assets/tsx'

export const SPACING = {
  formStack: 7,
  formWidth: 560,
}

export const ENABLED_ACTIONS: Array<{
  type: ProposalAction['type']
  label: string
  tooltip: string
  icon: IconType
}> = [
  {
    type: 'stake',
    label: 'Stake',
    tooltip: 'Create a "stake" proposal',
    icon: CgListTree,
  },
  {
    type: 'send',
    label: 'Send',
    tooltip: 'Create a "send" proposal',
    icon: CgListTree,
  },
]
