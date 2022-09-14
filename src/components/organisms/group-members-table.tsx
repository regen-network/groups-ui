import { useState } from 'react'

import type { GroupMember, MemberFormValues } from 'types'
import { formatDate } from 'util/date'
import { defaultMemberFormValues } from 'util/form.constants'
import { isBech32Address } from 'util/validation'

import { useBoolean, useBreakpointValue } from 'hooks/chakra'

import { AnimatePresence, FadeIn } from '@/animations'
import {
  Box,
  Button,
  DeleteButton,
  Flex,
  Input,
  NumberInput,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@/atoms'
import { TableTitlebar } from '@/molecules'
import { Truncate } from '@/molecules/Truncate'

export type GroupMembersTableUpdateValues = {
  newMembers: MemberFormValues[]
  memberUpdates: GroupMember[]
}

export const GroupMembersTable = ({
  members = [],
  onSave,
}: {
  members: GroupMember[]
  onSave: (vals: GroupMembersTableUpdateValues) => Promise<boolean>
}) => {
  const [isEdit, setEdit] = useBoolean(false)
  const [newMemberAddr, setNewMemberAddr] = useState('')
  const [addrErr, setAddrErr] = useState('')
  const [newMembers, setNewMembers] = useState<MemberFormValues[]>([])
  const [membersToUpdate, setMembersToUpdate] = useState<{ [addr: string]: string }>({})
  const tailSize = useBreakpointValue({ base: 4, sm: 6, md: 25, lg: 35, xl: 100 })

  function addNewMember() {
    if (!isBech32Address(newMemberAddr)) {
      return setAddrErr('Must be a valid Bech32 address')
    }
    const member: MemberFormValues = {
      ...defaultMemberFormValues,
      address: newMemberAddr,
    }
    setNewMembers([...newMembers, member])
  }

  function handleCancel() {
    setNewMembers([])
    setMembersToUpdate({})
    setAddrErr('')
    setEdit.off()
  }

  return (
    <TableContainer w="full" borderRadius="lg" borderWidth={2} shadow="md">
      <TableTitlebar title="Members">
        <AnimatePresence mode="wait">
          {isEdit && (
            <Flex grow={1} justify="end">
              <FadeIn
                key="edit-btns"
                style={{
                  display: 'flex',
                  flexGrow: 1,
                  gap: 8,
                  marginRight: 8,
                  justifyContent: 'flex-end',
                }}
              >
                <Flex direction="column" pos="relative">
                  <Tooltip
                    hasArrow
                    isOpen={!!addrErr}
                    label={addrErr}
                    color="black"
                    bg="tomato"
                  >
                    <Input
                      width="auto"
                      flexGrow={1}
                      maxW={470}
                      value={newMemberAddr}
                      errorBorderColor="tomato"
                      isInvalid={!!addrErr}
                      onChange={(e) => {
                        setAddrErr('')
                        setNewMemberAddr(e.target.value)
                      }}
                    />
                  </Tooltip>
                </Flex>
                <Button variant="outline" onClick={addNewMember}>
                  + Add Member
                </Button>
                <Button variant="ghost" fontSize="xs" onClick={handleCancel}>
                  cancel
                </Button>
              </FadeIn>
            </Flex>
          )}
        </AnimatePresence>
        <Button variant={isEdit ? 'solid' : 'outline'} onClick={setEdit.toggle}>
          {isEdit ? 'Save Changes' : 'Edit Members'}
        </Button>
      </TableTitlebar>
      <Table variant="striped" size="lg">
        <Thead>
          <Tr sx={{ '& > th': { fontWeight: 'bold' } }}>
            <Th>Address</Th>
            <Th>Voting Weight</Th>
            <Th>Date Added</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {members.map(({ member }, i) => {
            const key = member.address + i
            return (
              <Tr key={key}>
                <Td>
                  <Truncate tailLength={tailSize} text={member.address} />
                </Td>
                <Td>
                  <AnimatePresence mode="wait">
                    {isEdit ? (
                      <FadeIn key={'weight-edit' + key}>
                        <NumberInput
                          maxW={20}
                          min={0}
                          type="number"
                          value={membersToUpdate[member.address] ?? member.weight}
                          onChange={(n) => {
                            console.log('n :>> ', n)
                            setMembersToUpdate({
                              ...membersToUpdate,
                              [member.address]: isNaN(parseInt(n))
                                ? ''
                                : parseInt(n).toString(),
                            })
                          }}
                        />
                      </FadeIn>
                    ) : (
                      <FadeIn key={'weight' + key}>{member.weight}</FadeIn>
                    )}
                  </AnimatePresence>
                </Td>
                <Td>{formatDate(member.added_at)}</Td>
                <Td>
                  <AnimatePresence mode="wait">
                    {isEdit ? (
                      <FadeIn key={'delete' + key}>
                        <DeleteButton />
                      </FadeIn>
                    ) : (
                      <FadeIn key={'hidden' + key}>
                        <Box h={10} w={10} />
                      </FadeIn>
                    )}
                  </AnimatePresence>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
