import { useState } from 'react'
import { type FieldError, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { GroupFormKeys, GroupFormValues, MemberFormValues } from 'types'
import { defaultMemberFormValues } from 'util/form.constants'
import { truncate } from 'util/helpers'
import { SPACING } from 'util/style.constants'
import { valid } from 'util/validation/zod'

import {
  Button,
  DeleteButton,
  Flex,
  FormControl,
  HStack,
  NumberInput,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@/atoms'
import { FormCard, InputWithButton, Truncate } from '@/molecules'
import {
  FieldControl,
  InputField,
  RadioGroupField,
  TextareaField,
} from '@/molecules/form-fields'

const resolver = zodResolver(
  z.object({
    admin: valid.admin,
    name: valid.name,
    policyAsAdmin: valid.boolStr,
    description: valid.description.or(valid.emptyStr).optional(),
    forumLink: valid.url.or(valid.emptyStr).optional(),
    otherMetadata: valid.json.or(valid.emptyStr).optional(),
    members: valid.members,
  }),
)

export const GroupForm = ({
  btnText = 'Submit',
  defaultValues,
  disabledFields = [],
  onSubmit,
}: {
  btnText?: string
  defaultValues: GroupFormValues
  disabledFields?: GroupFormKeys[]
  onSubmit: (data: GroupFormValues) => void
}) => {
  const [memberAddr, setMemberAddr] = useState('')
  const form = useForm<GroupFormValues>({ defaultValues, resolver })
  const {
    fields: memberFields,
    append,
    remove,
  } = useFieldArray({ control: form.control, name: 'members' })
  const {
    watch,
    setValue,
    getValues,
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
    <FormCard>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack spacing={SPACING.formStack}>
            <RadioGroupField
              required
              name="policyAsAdmin"
              label="Group admin"
              radioGroupProps={{ isDisabled: disabledFields.includes('admin') }}
              options={[
                { value: 'true', label: 'Group policy' },
                {
                  value: 'false',
                  label: `You (${truncate(getValues().admin)})`,
                },
              ]}
            />
            <InputField required name="name" label="Group name" />
            <TextareaField name="description" label="Description" />
            <InputField name="forumLink" label="Link to forum" />
            <TextareaField name="otherMetadata" label="Other metadata" />
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
              <TableContainer>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Accounts added</Th>
                      <Th>Weight</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {controlledMemberFields.map((member, i) => (
                      <Tr key={i + member.address}>
                        <Td>
                          <Truncate
                            clickToCopy
                            text={member.address}
                            headLength={12}
                            tailLength={20}
                            tooltipProps={{ maxW: 450 }}
                          />
                        </Td>
                        <Td>
                          <HStack spacing={4}>
                            <FormControl isInvalid={!!errors.members?.[i]?.weight}>
                              <NumberInput
                                type="number"
                                min={0}
                                ref={form.register(`members.${i}.weight`, {
                                  valueAsNumber: true,
                                })}
                                onChange={(_, val) =>
                                  setValue(`members.${i}.weight`, val)
                                }
                                value={member.weight}
                              />
                            </FormControl>
                            <DeleteButton onClick={() => remove(i)} />
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
            <Flex justify="end">
              <Button type="submit">{btnText}</Button>
            </Flex>
          </Stack>
        </form>
      </FormProvider>
    </FormCard>
  )
}
