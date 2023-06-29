import { z } from 'zod'

import { useZodForm } from 'hooks/use-zod-form'

import { Form } from '@/molecules/form'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'
import { GroupMetadataFields } from '@/molecules/group-metadata-fields'
import { schema as baseSchema } from '@/organisms/group-form'

const schema = baseSchema
  .pick({ name: true, description: true, forumLink: true, otherMetadata: true })
  .extend({
    updateGroupType: z.literal('metadata'),
  })

export type MetadataFormValues = z.infer<typeof schema>

export const MetadataForm = ({
  defaultValues,
  formId,
  onSubmit,
  onError,
}: {
  defaultValues: MetadataFormValues
  formId: string
  onSubmit: (data: MetadataFormValues) => void
  onError: () => void
}) => {
  const form = useZodForm({
    defaultValues,
    schema,
  })

  return (
    <Form id={formId} form={form} onSubmit={onSubmit} onError={onError}>
      <GroupMetadataFields />
      <FormSubmitHiddenButton id={formId} />
    </Form>
  )
}
