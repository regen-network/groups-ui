import { useState } from 'react'
import { type FieldError, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  type GroupFormValues,
  type MemberFormValues,
  defaultMemberFormValues,
} from 'models'
import { Wallet } from 'store/Wallet'
import { truncate } from 'util/helpers'
import { valid } from 'util/validation/zod'

import {
  Button,
  Flex,
  FormControl,
  IconButton,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@/atoms'
import {
  FieldControl,
  FormCard,
  InputField,
  InputWithButton,
  RadioGroupField,
  TextareaField,
} from '@/molecules'

import { DeleteIcon } from 'assets/tsx'

const resolver = zodResolver(
  z.object({
    admin: z.union([
      z.string().min(1, 'Must select a value'),
      valid.bech32,
      z.literal('group'),
    ]),
    name: valid.name,
    description: valid.description.optional(),
    forumLink: valid.url.optional(),
    otherMetadata: valid.json.optional(),
    members: valid.members,
  }),
)

export const GroupForm = ({
  defaultValues,
  onSubmit,
}: {
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
    formState: { errors },
  } = form

  const watchFieldArray = form.watch('members')
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
          <Stack spacing={7}>
            <RadioGroupField
              required
              name="admin"
              label="Group admin"
              options={[
                { value: 'group', label: 'Group policy' },
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
            {/* TODO: move this? Currently it's only used here, but probably
            still good to pull out */}
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
                              <Input
                                type="number"
                                {...form.register(`members.${i}.weight`, {
                                  valueAsNumber: true,
                                })}
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
              <Button type="submit">Submit</Button>
            </Flex>
          </Stack>
        </form>
      </FormProvider>
    </FormCard>
  )
}
