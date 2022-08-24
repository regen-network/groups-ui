import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { FormContainer, RadioButtonGroup, TextFieldElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { defaultMemberFormValues, GroupFormValues, MemberFormValues } from 'models'
import { walletStore } from 'store'
import { truncate } from 'util/helpers'
import { valid } from 'util/zod'

import {
  Button,
  Flex,
  FlexEnd,
  IconButton,
  Paper,
  Stack,
  Table,
  TableContainer,
  TBody,
  TD,
  TextField,
  THead,
  TR,
} from '@/atoms'
import { FormCard } from '@/molecules'

import { DeleteForever } from 'assets/tsx'

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
  const { account } = walletStore
  const [memberAddr, setMemberAddr] = useState('')
  const form = useForm<GroupFormValues>({ defaultValues, resolver })
  const {
    formState: { errors },
  } = form
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
      <FormContainer formContext={form} handleSubmit={form.handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <RadioButtonGroup
            required
            name="admin"
            label="Group admin"
            options={[
              { id: 'group', label: 'Group policy' },
              {
                id: account.address,
                label: `You (${truncate(account.address)})`,
              },
            ]}
          />
          <TextFieldElement required name="name" label="Group name" />
          <TextFieldElement
            multiline
            name="description"
            label="Description"
            minRows={4}
            maxRows={8}
          />
          <TextFieldElement name="forumLink" label="Link to forum" />
          <TextFieldElement
            multiline
            name="otherMetadata"
            label="Other metadata"
            minRows={4}
            maxRows={8}
          />
          <Flex>
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
          </Flex>
          {/* TODO: move this */}
          {memberFields.length > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <THead>
                  <TR sx={{ '& > th': { fontWeight: 'bold' } }}>
                    <TD>Accounts added</TD>
                    <TD>Weight</TD>
                    <TD />
                  </TR>
                </THead>
                <TBody>
                  {memberFields.map((member, i) => (
                    <TR key={i + member.address}>
                      <TD>{member.address}</TD>
                      <TD>{member.weight}</TD>
                      <TD>
                        <IconButton onClick={() => remove(i)}>
                          <DeleteForever />
                        </IconButton>
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </TableContainer>
          )}
          <FlexEnd>
            <Button type="submit">Submit</Button>
          </FlexEnd>
        </Stack>
      </FormContainer>
    </FormCard>
  )
}
