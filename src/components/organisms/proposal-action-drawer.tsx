import type { ProposalAction } from 'types'
import { ENABLED_ACTIONS } from 'util/constants'

import {
  type DrawerProps,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Text,
} from '@/atoms'
import { ActionButton } from '@/molecules/action-button'

type Props = {
  onActionSelect: (actionType: ProposalAction['type']) => void
  isOpen: DrawerProps['isOpen']
  onClose: DrawerProps['onClose']
  finalFocusRef?: DrawerProps['finalFocusRef']
}

export const ProposalActionDrawer = ({
  isOpen,
  finalFocusRef,
  onActionSelect,
  onClose,
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
            {ENABLED_ACTIONS.map((a, i) => (
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
