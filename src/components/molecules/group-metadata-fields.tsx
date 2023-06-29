import { InputField, TextareaField } from '@/molecules/form-fields'

export const GroupMetadataFields = () => {
  return (
    <>
      <InputField required name="name" label="Group name" />
      <TextareaField name="description" label="Group description" />
      <TextareaField name="otherMetadata" label="Other metadata" />
      <InputField name="forumLink" label="Link to forum" />
    </>
  )
}
