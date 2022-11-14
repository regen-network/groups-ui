import { useMemo, useState } from 'react'

import type { MemberFormValues, UIGroupMember } from 'types'
import { formatDate } from 'util/date'
import { defaultMemberFormValues } from 'util/form.constants'
import { isBech32Address } from 'util/validation'

import { toMemberFormValues } from 'api/group.utils'
import { useBoolean, useBreakpointValue, useColorModeValue } from 'hooks/chakra'

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
  UndoButton,
} from '@/atoms'
import { TableTitlebar, Truncate } from '@/molecules'

export const GroupMembersTable = ({
  members = [],
  onSave,
}: {
  members: UIGroupMember[]
  onSave: (vals: MemberFormValues[]) => Promise<boolean>
}) => {
  const [isEdit, setEdit] = useBoolean(false)
  const [submitting, setSubmitting] = useState(false)
  const [newMemberAddr, setNewMemberAddr] = useState('')
  const [newMembers, setNewMembers] = useState<MemberFormValues[]>([])
  const [membersToUpdate, setMembersToUpdate] = useState<{
    [addr: string]: MemberFormValues
  }>({})
  const [addrErr, setAddrErr] = useState('')
  const tailSize = useBreakpointValue({ base: 4, sm: 6, md: 25, lg: 35, xl: 100 })

  const tableMembers: MemberFormValues[] = useMemo(() => {
    const currMembers = members.map(toMemberFormValues)
    return [...newMembers, ...currMembers]
  }, [members, newMembers])

  function resetState() {
    setNewMembers([])
    setMembersToUpdate({})
    setNewMemberAddr('')
    setAddrErr('')
    setEdit.off()
  }

  async function handleSave() {
    const members = Object.values(membersToUpdate)
    if (!members.length) return
    setSubmitting(true)
    const success = await onSave(members)
    setSubmitting(false)
    if (success) {
      resetState()
      setEdit.off()
    }
  }

  function handleUndo(member: MemberFormValues) {
    const newMembers = { ...membersToUpdate }
    delete newMembers[member.address]
    setMembersToUpdate(newMembers)
  }

  function changeMemberWeight(member: MemberFormValues, weight: string) {
    const n = parseInt(weight)
    setMembersToUpdate({
      ...membersToUpdate,
      [member.address]: {
        ...member,
        weight: isNaN(n) ? 0 : n,
      },
    })
  }

  function addNewMember() {
    if (!isBech32Address(newMemberAddr)) {
      return setAddrErr('Must be a valid Bech32 address')
    }
    if (tableMembers.find((m) => m.address === newMemberAddr)) {
      return setAddrErr('Address already added')
    }
    const member: MemberFormValues = {
      ...defaultMemberFormValues(),
      address: newMemberAddr,
    }
    setMembersToUpdate({ ...membersToUpdate, [member.address]: member })
    setNewMembers([...newMembers, member])
    setNewMemberAddr('')
  }

  const updatedBg = useColorModeValue('blue.100', 'blue.800')
  const deletedBg = useColorModeValue('red.100', 'red.900')

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
                <Flex direction="column" pos="relative" grow={1} maxW={440}>
                  <Tooltip
                    hasArrow
                    isOpen={!!addrErr}
                    label={addrErr}
                    color="black"
                    bg="tomato"
                  >
                    <Input
                      width="auto"
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
                <Button variant="outline" onClick={addNewMember} disabled={submitting}>
                  + Add Member
                </Button>
                <Button
                  variant="ghost"
                  fontSize="xs"
                  onClick={resetState}
                  disabled={submitting}
                >
                  cancel
                </Button>
              </FadeIn>
            </Flex>
          )}
        </AnimatePresence>
        <Button
          variant={isEdit ? 'solid' : 'outline'}
          onClick={isEdit ? handleSave : setEdit.toggle}
          loadingText="Saving"
          isLoading={submitting}
        >
          {isEdit ? 'Save Changes' : 'Edit Members'}
        </Button>
      </TableTitlebar>
      <Table size="lg" variant={isEdit ? undefined : 'striped'}>
        <Thead>
          <Tr sx={{ '& > th': { fontWeight: 'bold' } }}>
            <Th>Address</Th>
            <Th>Voting Weight</Th>
            <Th>Date Added</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {tableMembers.map((member, i) => {
            const key = member.address + i
            const updatedMember = membersToUpdate[member.address]
            return (
              <Tr
                key={key}
                sx={{
                  '> td': {
                    bgColor: updatedMember
                      ? updatedMember.weight === 0
                        ? deletedBg
                        : updatedBg
                      : undefined,
                  },
                }}
              >
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
                          value={updatedMember?.weight ?? member.weight}
                          onChange={(weight) => changeMemberWeight(member, weight)}
                        />
                      </FadeIn>
                    ) : (
                      <FadeIn key={'weight' + key}>{member.weight}</FadeIn>
                    )}
                  </AnimatePresence>
                </Td>
                <Td>{formatDate(member.addedAt)}</Td>
                <Td>
                  <AnimatePresence mode="wait">
                    {isEdit ? (
                      <FadeIn key={'delete' + key}>
                        {updatedMember ? (
                          <UndoButton
                            onClick={() => handleUndo(member)}
                            hoverText={
                              updatedMember.weight === 0
                                ? 'Undo deletion'
                                : 'Revert change'
                            }
                          />
                        ) : (
                          <DeleteButton onClick={() => changeMemberWeight(member, '0')} />
                        )}
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
