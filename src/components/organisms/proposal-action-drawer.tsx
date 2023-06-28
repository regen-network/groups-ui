import type { ProposalAction } from 'types'
import { getActions } from 'util/actions'

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  type DrawerProps,
  Stack,
  Text,
} from '@/atoms'
import { ActionButton } from '@/molecules/action-button'

type Props = {
  onActionSelect: (actionType: ProposalAction['type']) => void
  isOpen: DrawerProps['isOpen']
  onClose: DrawerProps['onClose']
  finalFocusRef?: DrawerProps['finalFocusRef']
  policyAsGroupAdmin?: boolean
  policyAsPolicyAdmin?: boolean
}

export const ProposalActionDrawer = ({
  isOpen,
  finalFocusRef,
  onActionSelect,
  onClose,
  policyAsGroupAdmin,
  policyAsPolicyAdmin,
}: Props) => {
  return (
    <Drawer
      placement="right"
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
      finalFocusRef={finalFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add New Action</DrawerHeader>
        <DrawerBody>
          <Text fontWeight="bold" mb={4}>
            Event type
          </Text>
          <Stack spacing={3}>
            {getActions(policyAsGroupAdmin, policyAsPolicyAdmin).map((a, i) => (
              <ActionButton
                key={'action-' + i}
                icon={a.icon}
                label={a.label}
                tooltipText={a.tooltip}
                onClick={() => onActionSelect(a.type)}
              />
            ))}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
