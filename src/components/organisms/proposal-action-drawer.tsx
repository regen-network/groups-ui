import { ProposalEventType } from 'types'

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
import { ActionButton } from '@/molecules'

import { CgListTree, ImFileText2 } from 'assets/tsx'

type Props = {
  onActionSelect: (action: ProposalEventType) => void
  isOpen: DrawerProps['isOpen']
  onClose: DrawerProps['onClose']
  finalFocusRef: DrawerProps['finalFocusRef']
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
            <ActionButton
              icon={ImFileText2}
              label="Text"
              tooltipText='Create a "text" proposal'
              onClick={() => onActionSelect('text')}
            />
            <ActionButton
              icon={CgListTree}
              label="Stake"
              tooltipText='Create a "stake" proposal'
              onClick={() => onActionSelect('stake')}
            />
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
