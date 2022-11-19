import { type IconButtonProps, IconButton, Tooltip } from './chakra'

import { RiDeleteBin6Line } from 'assets/tsx'

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
        <RiDeleteBin6Line />
      </IconButton>
    </Tooltip>
  )
}
