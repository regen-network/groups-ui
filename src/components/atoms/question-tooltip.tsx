import { Tooltip } from './chakra-components'

import { QuestionOutlineIcon } from 'assets/tsx'

export const QuestionTooltip = ({ label }: { label: string }) => {
  return (
    <Tooltip label={label} hasArrow>
      <QuestionOutlineIcon color="blue.500" fontSize="25px" />
    </Tooltip>
  )
}
