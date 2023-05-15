import { ENABLED_ACTIONS } from 'util/constants'

import { ROUTE_PATH } from 'routes'

import { Button, type ButtonProps, RouteLink } from '@/atoms'

import { ImFileText2 } from 'assets/tsx'

export const ProposalActionButtons = ({
  groupId,
  btnProps,
}: {
  groupId: string
  btnProps?: ButtonProps
}) => {
  const actions = [
    // we want a 'text proposal' create button on proposal page, but it isn't available elsewhere
    {
      type: 'text',
      label: 'Text Proposal',
      tooltip: 'Create a "text" proposal',
      icon: ImFileText2,
    },
    ...ENABLED_ACTIONS,
  ]
  return (
    <>
      {actions.map(({ type, label, icon: Icon }, i) => (
        <Button
          {...btnProps}
          key={'proposal-action-' + i}
          as={RouteLink}
          to={ROUTE_PATH.proposalCreate(groupId)}
          state={{ newProposalType: type }}
          leftIcon={<Icon />}
        >
          {label}
        </Button>
      ))}
    </>
  )
}
