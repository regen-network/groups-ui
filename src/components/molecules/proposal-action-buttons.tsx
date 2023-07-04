import { getActions } from 'util/actions'

import { ROUTE_PATH } from 'routes'

import { Button, type ButtonProps, RouteLink } from '@/atoms'

import { FileTextIcon } from 'assets/tsx'

export const ProposalActionButtons = ({
  groupId,
  btnProps,
  policyAsGroupAdmin,
  policyAsPolicyAdmin,
}: {
  groupId: string
  btnProps?: ButtonProps
  policyAsGroupAdmin?: boolean
  policyAsPolicyAdmin?: boolean
}) => {
  const actions = [
    // we want a 'text proposal' create button on proposal page, but it isn't available elsewhere
    {
      type: 'text',
      label: 'Text Proposal',
      tooltip: 'Create a "text" proposal',
      icon: FileTextIcon,
    },
    ...getActions(policyAsGroupAdmin, policyAsPolicyAdmin),
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
