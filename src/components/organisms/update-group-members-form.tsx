import { z } from 'zod'

import { useZodForm } from 'hooks/use-zod-form'

import { Form } from '@/molecules/form'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'
import { GroupMembersFields } from '@/molecules/group-members-fields'
import { schema as baseSchema } from '@/organisms/group-form'

const schema = baseSchema.pick({ members: true }).extend({
  updateGroupType: z.literal('members'),
})

export type MembersFormValues = z.infer<typeof schema>

export const MembersForm = ({
  defaultValues,
  formId,
  onSubmit,
  onError,
}: {
  defaultValues: MembersFormValues
  formId: string
  onSubmit: (data: MembersFormValues) => void
  onError: () => void
}) => {
  const form = useZodForm({
    defaultValues,
    schema,
  })

  return (
    <Form id={formId} form={form} onSubmit={onSubmit} onError={onError}>
      <GroupMembersFields />
      <FormSubmitHiddenButton id={formId} />
    </Form>
  )
}
