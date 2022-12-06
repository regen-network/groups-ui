import { useRef } from 'react'

import type { UIProposal } from 'types'

import { useDisclosure } from 'hooks/chakra'

import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  PageContainer,
  Stack,
  Text,
} from '@/atoms'
import { EditableDescription, EditableHeading, PageStepper } from '@/molecules'
import { ProposalStakeForm } from '@/organisms/proposal-stake-form'

import { AiOutlinePlus } from 'assets/tsx'

export function ProposalTemplate({
  proposal,
  steps,
}: {
  steps: string[]
  proposal: UIProposal
}) {
  const { title, description } = proposal.metadata
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)
  return (
    <Flex direction="column">
      <PageStepper activeStep={0} steps={steps} />
      <PageContainer maxW="container.sm">
        <Stack spacing={3}>
          <EditableHeading
            value={title}
            onSubmit={(value) => console.log('heading change:', value)}
          />
          <EditableDescription
            value={description}
            onSubmit={(value) => console.log('description changed: ', value)}
          />

          <Flex align="baseline" pb={3}>
            <Heading variant="label" size="xs">
              Group:
            </Heading>
            <Text ml={2}>Group name</Text>
          </Flex>
          <ProposalStakeForm />
          <Center>
            <IconButton
              aria-label="new action"
              onClick={onOpen}
              ref={btnRef}
              rounded="full"
              icon={<AiOutlinePlus />}
            />
          </Center>
        </Stack>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Add New Action</DrawerHeader>
            <DrawerBody>
              <Box borderWidth={2} borderRadius={'lg'} p={4}>
                Text
              </Box>
              <Box borderWidth={2} borderRadius={'lg'} p={4}>
                Event
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </PageContainer>
    </Flex>
  )
}
