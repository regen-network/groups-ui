import { Tooltip } from './chakra-components'

import { InfoOutlineIcon } from 'assets/tsx'

export const InfoTooltip = ({ label }: { label: string }) => {
  return (
    <Tooltip label={label} hasArrow>
      <InfoOutlineIcon color="blue.500" fontSize="25px" />
    </Tooltip>
  )
}
