import { useColorModeValue, useEditableControls } from 'hooks/chakra-hooks'

import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Heading,
  IconButton,
  Textarea,
  Tooltip,
} from '@/atoms'

import { MdCheck, RiCloseLine } from 'assets/tsx'

type EditableProps = {
  value?: string
  onSave: (value: string) => void
}

const EditableControls = () => {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps } = useEditableControls()

  return isEditing ? (
    <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
      <IconButton
        aria-label="Save changes"
        icon={<MdCheck />}
        {...getSubmitButtonProps()}
      />
      <IconButton
        aria-label="Cancel changes"
        icon={<RiCloseLine />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : null
}

/** contains base logic for editable components */
const EditableWrapper = ({
  value,
  variant,
  onSave,
}: EditableProps & { variant: 'heading' | 'textarea' }) => {
  const hoverBg = useColorModeValue('gray.100', 'gray.700')
  return (
    <Editable
      as={variant === 'heading' ? Heading : undefined}
      defaultValue={value}
      isPreviewFocusable={true}
      selectAllOnFocus={false}
      onSubmit={onSave}
    >
      <Tooltip label="Click to edit">
        <EditablePreview
          _hover={{
            background: hoverBg,
          }}
        />
      </Tooltip>
      {variant === 'heading' ? (
        <Heading as={EditableInput} />
      ) : (
        <Textarea as={EditableTextarea} />
      )}
      <EditableControls />
    </Editable>
  )
}

export const EditableHeading = (props: EditableProps) => {
  return <EditableWrapper variant="heading" {...props} />
}

export const EditableDescription = (props: EditableProps) => {
  return <EditableWrapper variant="textarea" {...props} />
}
