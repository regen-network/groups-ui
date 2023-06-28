import { useState } from 'react'
import { type FieldError, useFieldArray, useFormContext } from 'react-hook-form'
import { z } from 'zod'

import type { GroupFormValues, MemberFormValues } from 'types'
import { defaultMemberFormValues } from 'util/form.defaults'
import { valid } from 'util/validation/zod'

import { AnimatePresence, motion, MOTIONS } from '@/animations'
import {
  DeleteButton,
  Flex,
  FormControl,
  HStack,
  NumberInput,
  Table,
  Td,
  Th,
  Thead,
  Tr,
} from '@/atoms'
import { FieldControl } from '@/molecules/form-fields'
import { InputWithButton } from '@/molecules/input-with-button'
import { Truncate } from '@/molecules/truncate'

export interface Members {
  members: GroupFormValues['members']
}

export const GroupMemberFields = () => {
  const [memberAddr, setMemberAddr] = useState('')
  const form = useFormContext<Members>()
  const {
    fields: memberFields,
    append,
    remove,
  } = useFieldArray({ control: form.control, name: 'members' })
  const {
    watch,
    setValue,
    formState: { errors },
  } = form

  const watchFieldArray = watch('members')
  const controlledMemberFields = memberFields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    }
  })

  function validateAddress(addr: string): boolean {
    if (memberFields.find((m) => m.address === addr)) {
      form.setError('members', { type: 'invalid', message: 'Address already added' })
      return false
    }
    try {
      valid.bech32Address.parse(addr)
      return true
    } catch (err) {
      if (err instanceof z.ZodError) {
        form.setError('members', { type: 'invalid', message: err.issues[0].message })
      }
      return false
    }
  }

  function addMember(): void {
    if (!validateAddress(memberAddr)) return
    const member: MemberFormValues = { ...defaultMemberFormValues(), address: memberAddr }
    append(member)
    setMemberAddr('')
  }

  return (
    <>
      <Flex>
        {/* Because of how the form is structured, we need a controlled
        value which is associated with the `members` array, but doesn't
        directly add to it */}
        <FieldControl
          required
          error={errors.members as FieldError} // TODO fix type cast
          name="memberAddr"
          label="Add member accounts"
          helperText="Input the addresses of the members of this group."
        >
          <InputWithButton
            name="memberAddr"
            value={memberAddr}
            fontSize="sm"
            onChange={(e) => {
              if (errors.members) {
                form.clearErrors('members')
              }
              setMemberAddr(e.target.value)
            }}
            onBtnClick={addMember}
          >
            {'+ Add'}
          </InputWithButton>
        </FieldControl>
      </Flex>
      {controlledMemberFields.length > 0 && (
        <motion.div layout style={{ overflow: 'hidden' }}>
          <Table>
            <Thead>
              <Tr sx={{ '& > th': { border: 'none', pb: 0 } }}>
                <Th pl={0}>Accounts added</Th>
                <Th>Weight</Th>
              </Tr>
            </Thead>
            <motion.tbody layout>
              <AnimatePresence mode="popLayout">
                {controlledMemberFields.map((member, i) => {
                  const isLast = i === controlledMemberFields.length - 1
                  return (
                    <motion.tr
                      {...MOTIONS.fadeIn}
                      layout
                      transition={{ type: 'spring' }}
                      key={member.address}
                    >
                      <Td pl={0} pr={2} borderWidth={isLast ? 0 : undefined}>
                        <Truncate
                          clickToCopy
                          text={member.address}
                          headLength={17}
                          tailLength={18}
                          tooltipProps={{ maxW: 450 }}
                        />
                      </Td>
                      <Td pr={0} pl={3} borderWidth={isLast ? 0 : undefined}>
                        <HStack spacing={4}>
                          <FormControl isInvalid={!!errors.members?.[i]?.weight}>
                            <NumberInput
                              type="number"
                              min={0}
                              ref={form.register(`members.${i}.weight`, {
                                valueAsNumber: true,
                              })}
                              onChange={(_, val) =>
                                setValue(`members.${i}.weight`, !isNaN(val) ? val : 0)
                              }
                              value={member.weight}
                            />
                          </FormControl>
                          <DeleteButton onClick={() => remove(i)} />
                        </HStack>
                      </Td>
                    </motion.tr>
                  )
                })}
              </AnimatePresence>
            </motion.tbody>
          </Table>
        </motion.div>
      )}
    </>
  )
}
