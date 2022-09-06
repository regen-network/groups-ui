import { useEffect, useState } from 'react'
import { type FieldError, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  type GroupFormValues,
  type MemberFormValues,
  defaultMemberFormValues,
} from 'models'
import { Wallet } from 'store/Wallet'
import { SPACING } from 'util/constants'
import { truncate } from 'util/helpers'
import { valid } from 'util/validation/zod'

import {
  Button,
  Flex,
  FormCard,
  FormControl,
  IconButton,
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
import { InputWithButton } from '@/molecules'
import {
  FieldControl,
  InputField,
  RadioGroupField,
  TextareaField,
} from '@/molecules/FormFields'

import { DeleteIcon } from 'assets/tsx'

const resolver = zodResolver(
  z.object({
    admin: valid.admin,
    name: valid.name,
    description: valid.description.optional(),
    forumLink: valid.url.optional(),
    otherMetadata: valid.json.optional(),
    members: valid.members,
    policyAsAdmin: z.boolean(),
  }),
)

export const GroupForm = ({
  btnText = 'Submit',
  defaultValues,
  onSubmit,
}: {
  btnText?: string
  defaultValues: GroupFormValues
  onSubmit: (data: GroupFormValues) => void
}) => {
  const { account } = Wallet
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

  const adminValue = watch('admin', 'policy')

  useEffect(() => {
    // watch admin value - if set to 'policy', set policyAsAdmin to true
    if (adminValue === 'policy') {
      setValue('policyAsAdmin', true)
    } else {
      if (getValues().policyAsAdmin === true) {
        setValue('policyAsAdmin', false)
      }
    }
  }, [adminValue, setValue, getValues])

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
      valid.bech32.parse(addr)
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
    const member: MemberFormValues = { ...defaultMemberFormValues, address: memberAddr }
    append(member)
    setMemberAddr('')
  }

  if (!account) return null
  return (
    <FormCard>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack spacing={SPACING.formStack}>
            <RadioGroupField
              required
              name="admin"
              label="Group admin"
              options={[
                { value: 'policy', label: 'Group policy' },
                {
                  value: account.address,
                  label: `You (${truncate(account.address)})`,
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
                        <Td>{member.address}</Td>
                        <Td pr={0}>
                          <Flex>
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
                            <IconButton
                              ml={2}
                              aria-label="Delete"
                              onClick={() => remove(i)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Flex>
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
