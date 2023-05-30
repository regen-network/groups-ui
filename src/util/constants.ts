import type { ProposalAction } from 'types'

import { type IconProps } from '@/atoms'

import { ListTreeIcon, SendIcon } from 'assets/tsx'

export const SPACING = {
  formStack: 7,
  formWidth: 560,
}

export const ENABLED_ACTIONS: Array<{
  type: ProposalAction['type']
  label: string
  tooltip: string
  icon: (props: IconProps) => JSX.Element
}> = [
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
