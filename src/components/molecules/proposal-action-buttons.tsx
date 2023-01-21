import { ENABLED_ACTIONS } from 'util/constants'

import { ROUTE_PATH } from 'routes'

import { Button, RouteLink } from '@/atoms'

export const ProposalActionButtons = ({ groupId }: { groupId: string }) => {
  return (
    <>
      {ENABLED_ACTIONS.map((a, i) => (
        <Button
          key={'proposal-actioon-' + i}
          as={RouteLink}
          to={ROUTE_PATH.proposalCreate(groupId)}
          state={{ newProposalType: a.type }}
        >
          {a.label}
        </Button>
      ))}
    </>
  )
}
