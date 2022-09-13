import { truncate } from 'util/helpers'

import { type TextProps, type TooltipProps, Text, Tooltip } from '@/atoms'

export const TruncateTooltip = ({
  headLength,
  tailLength,
  text,
  textProps,
  tooltipProps,
}: {
  headLength?: number
  tailLength?: number
  text: string
  textProps?: TextProps
  tooltipProps?: Omit<TooltipProps, 'children'>
}) => {
  return (
    <Tooltip {...tooltipProps} hasArrow label={text}>
      <Text {...textProps}>{truncate(text, { headLength, tailLength })}</Text>
    </Tooltip>
  )
}
