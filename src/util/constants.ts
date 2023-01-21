import type { IconType } from 'react-icons'

import type { ProposalAction } from 'types'

import { CgListTree, ImFileText2 } from 'assets/tsx'

export const SPACING = {
  formStack: 7,
  formWidth: 560,
}

type EnabledAction = {
  type: ProposalAction['type']
  label: string
  tooltip: string
  icon: IconType
}
export const ENABLED_ACTIONS: EnabledAction[] = [
  {
    type: 'text',
    label: 'Text Proposal',
    tooltip: 'Create a "text" proposal',
    icon: ImFileText2,
  },
  {
    type: 'stake',
    label: 'Stake',
    tooltip: 'Create a "stake" proposal',
    icon: CgListTree,
  },
]
