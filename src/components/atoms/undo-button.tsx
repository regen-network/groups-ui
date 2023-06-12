import { IconButton, type IconButtonProps, Tooltip } from './chakra-components'

import { UndoIcon } from 'assets/tsx'

export const UndoButton = ({
  hoverText,
  ...props
}: Omit<IconButtonProps, 'aria-label'> & {
  'aria-label'?: string
  hoverText?: string
}) => {
  return (
    <Tooltip label={hoverText} isDisabled={!hoverText}>
      <IconButton {...props} aria-label={props['aria-label'] || 'Delete'}>
        <UndoIcon />
      </IconButton>
    </Tooltip>
  )
}
