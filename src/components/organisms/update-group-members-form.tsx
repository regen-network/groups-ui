import { z } from 'zod'

import { useZodForm } from 'hooks/use-zod-form'

import { Form } from '@/molecules/form'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'
import { GroupMembersFields } from '@/molecules/group-members-fields'
import { GroupFormValues, schema as baseSchema } from '@/organisms/group-form'

const schema = baseSchema.pick({ members: true }).extend({
  updateGroupType: z.literal('members'),
})

export type MembersFormValues = z.infer<typeof schema>

export const MembersForm = ({
  defaultValues,
  formId,
  onSubmit,
  onError,
  initialGroupValues,
}: {
  defaultValues: MembersFormValues
  formId: string
  onSubmit: (data: MembersFormValues) => void
  onError: () => void
  initialGroupValues: GroupFormValues
}) => {
  const form = useZodForm({
    defaultValues,
    schema,
  })

  return (
    <Form
      id={formId}
      form={form}
      onSubmit={(data) => {
        if (
          !(
            data.members.length === initialGroupValues.members.length &&
            data.members.every(
              (o, idx) =>
                o.address === initialGroupValues.members[idx].address &&
                o.weight === initialGroupValues.members[idx].weight,
            )
          )
        ) {
          onSubmit(data)
        }
      }}
      onError={onError}
    >
      <GroupMembersFields />
      <FormSubmitHiddenButton id={formId} />
    </Form>
  )
}
