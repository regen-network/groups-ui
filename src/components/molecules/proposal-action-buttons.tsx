import { ENABLED_ACTIONS } from 'util/constants'

import { ROUTE_PATH } from 'routes'

import { type ButtonProps, Button, RouteLink } from '@/atoms'

export const ProposalActionButtons = ({
  groupId,
  btnProps,
}: {
  groupId: string
  btnProps?: ButtonProps
}) => {
  return (
    <>
      {ENABLED_ACTIONS.map(({ type, label, icon: Icon }, i) => (
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
