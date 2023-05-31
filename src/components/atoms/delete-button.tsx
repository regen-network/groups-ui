import { IconButton, type IconButtonProps, Tooltip } from './chakra-components'

import { DeleteIcon } from 'assets/tsx'

export const DeleteButton = ({
  hoverText,
  ...props
}: Omit<IconButtonProps, 'aria-label'> & {
  'aria-label'?: string
  hoverText?: string
}) => {
  return (
    <Tooltip label={hoverText} isDisabled={!hoverText}>
      <IconButton {...props} aria-label={props['aria-label'] || 'Delete'}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  )
}
