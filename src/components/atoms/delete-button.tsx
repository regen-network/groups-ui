import { type IconButtonProps, IconButton } from './chakra'

import { DeleteIcon } from 'assets/tsx'

export const DeleteButton = (
  props: Omit<IconButtonProps, 'aria-label'> & { 'aria-label'?: string },
) => {
  return (
    <IconButton {...props} aria-label={props['aria-label'] || 'Delete'}>
      <DeleteIcon />
    </IconButton>
  )
}
