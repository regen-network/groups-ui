import { useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { defaultMemberFormValues, GroupFormValues, MemberFormValues } from 'models'
import { Wallet } from 'store/Wallet'
import { truncate } from 'util/helpers'
import { valid } from 'util/zod'

import {
  Button,
  Flex,
  IconButton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from '@/atoms'
import { FormCard, FormInput, FormRadioGroup, FormTextarea } from '@/molecules'

import { DeleteIcon } from 'assets/tsx'

const resolver = zodResolver(
  z.object({
    admin: valid.groupOrAddress,
    name: valid.name,
    description: valid.string.optional(),
    forumLink: valid.url.optional(),
    otherMetadata: valid.json.optional(),
    members: valid.member.array().nonempty('Must include at least one member'),
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

  // TODO: could potentially live in its own file in /validators
  function validateAddress(addr: string): boolean {
    try {
      valid.address.parse(addr)
      return true
    } catch (err) {
      if (err instanceof z.ZodError) {
        form.setError('members', { type: 'invalid', message: err.issues[0].message })
      }
      return false
    }
  }

  /** the layout of this UI makes using the hook-form helpers impractical.
   * Manually handing logic here */
  function addMember(): void {
    if (!validateAddress(memberAddr)) {
      return
    }
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
            <FormRadioGroup
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
            <FormInput required name="name" label="Group name" />
            <FormTextarea name="description" label="Description" />
            <FormInput name="forumLink" label="Link to forum" />
            <FormTextarea name="otherMetadata" label="Other metadata" />
            {/* <Flex>
              <TextField
                label="Add member accounts"
                value={memberAddr}
                onChange={(e) => setMemberAddr(e.target.value)}
                error={!!errors.members}
                helperText={
                  errors.members?.message ||
                  'Input the addresses of the members of this group.'
                }
                sx={{ flexGrow: 1, mr: 1 }}
              />
              <div>
                <Button variant="outlined" onClick={addMember} sx={{ py: 1.85 }}>
                  + Add
                </Button>
              </div>
            </Flex> */}
            {/* TODO: move this? Currently it's only used here */}
            {memberFields.length > 0 && (
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr sx={{ '& > th': { fontWeight: 'bold' } }}>
                      <Td>Accounts added</Td>
                      <Td>Weight</Td>
                      <Td />
                    </Tr>
                  </Thead>
                  <Tbody>
                    {memberFields.map((member, i) => (
                      <Tr key={i + member.address}>
                        <Td>{member.address}</Td>
                        <Td>{member.weight}</Td>
                        <Td>
                          <IconButton aria-label="Delete" onClick={() => remove(i)}>
                            <DeleteIcon />
                          </IconButton>
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
