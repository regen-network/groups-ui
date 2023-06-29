import { InputField, TextareaField } from '@/molecules/form-fields'

export const GroupMetadataFields = () => {
  return (
    <>
      <InputField required name="name" label="Group name" />
      <TextareaField name="description" label="Description" />
      <InputField name="forumLink" label="Link to forum" />
      <TextareaField name="otherMetadata" label="Other metadata" />
    </>
  )
}
