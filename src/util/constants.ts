import type { ProposalAction } from 'types'

import { type IconProps } from '@/atoms'

import { ListTreeIcon, SendIcon } from 'assets/tsx'
import { UpdateGroupIcon } from 'assets/tsx/update-group-icon'

export const SPACING = {
  formStack: 7,
  formWidth: 560,
}

type Action = {
  type: ProposalAction['type']
  label: string
  tooltip: string
  icon: (props: IconProps) => JSX.Element
}

export const ENABLED_ACTIONS: Array<Action> = [
  {
    type: 'send',
    label: 'Send',
    tooltip: 'Create a "send" proposal',
    icon: SendIcon,
  },
  {
    type: 'stake',
    label: 'Stake',
    tooltip: 'Create a "stake" proposal',
    icon: ListTreeIcon,
  },
]

export const UPDATE_GROUP_ACTION: Action = {
  type: 'update-group',
  label: 'Update group',
  tooltip: 'TODO',
  icon: UpdateGroupIcon,
}
