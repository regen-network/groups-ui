import { FormContainer, RadioButtonGroup, TextFieldElement } from 'react-hook-form-mui'
import { MemberRequest } from '@haveanicedavid/groups-ui-telescope/types/proto/cosmos/group/v1/types'

import { walletStore } from 'store'

import { Card, CardContent, Stack } from '@/atoms'

// import { Paper } from '@/atoms'

type Inputs = {
  admin: string
  name: string
  description?: string
  otherMetadata?: string
  members: MemberRequest[]
}

const initialValues: Inputs = {
  admin: '',
  name: '',
  description: undefined,
  otherMetadata: undefined,
  members: [],
}

export const CreateGroupForm = () => {
  if (!walletStore.account) return null
  return (
    <Card>
      <CardContent>
        <FormContainer>
          <Stack spacing={2}>
            <RadioButtonGroup
              name="admin"
              options={[
                { id: 'group', label: 'Group policy' },
                {
                  id: walletStore.account.address,
                  label: `You (${walletStore.account.address})`,
                },
              ]}
            />
            <TextFieldElement name="name" label="Group name" />
            <TextFieldElement name="description" label="Description" />
          </Stack>
        </FormContainer>
      </CardContent>
    </Card>
  )
}
