import { z } from 'zod'

import { truncate } from 'util/helpers'
import { valid } from 'util/validation/zod'

import { useZodForm } from 'hooks/use-zod-form'

import { Form } from '@/molecules/form'
import { FormCard } from '@/molecules/form-card'
import { RadioGroupField } from '@/molecules/form-fields'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'
import { GroupMembersFields } from '@/molecules/group-members-fields'
import { GroupMetadataFields } from '@/molecules/group-metadata-fields'

export const schema = z.object({
  admin: valid.admin,
  name: valid.name,
  policyAsAdmin: valid.boolStr,
  description: valid.description.or(valid.emptyStr).optional(),
  forumLink: valid.url.or(valid.emptyStr).optional(),
  otherMetadata: valid.json.or(valid.emptyStr).optional(),
  members: valid.members,
})

export type GroupFormValues = z.infer<typeof schema>
export type GroupFormKeys = keyof GroupFormValues

export const GroupForm = ({
  defaultValues,
  disabledFields = [],
  onSubmit,
}: {
  defaultValues: GroupFormValues
  disabledFields?: GroupFormKeys[]
  onSubmit: (data: GroupFormValues) => void
}) => {
  const form = useZodForm({ defaultValues, schema })
  const { getValues } = form

  return (
    <FormCard>
      <Form form={form} onSubmit={onSubmit}>
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
        <GroupMetadataFields />
        <GroupMembersFields />
        <FormSubmitHiddenButton id="group-form" />
      </Form>
    </FormCard>
  )
}
