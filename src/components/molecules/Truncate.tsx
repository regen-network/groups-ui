import { truncate } from 'util/helpers'

import { type TextProps, type TooltipProps, Text, Tooltip } from '@/atoms'

export const Truncate = ({
  headLength,
  disabled = false,
  tailLength,
  text,
  textProps,
  tooltipProps,
}: {
  headLength?: number
  disabled?: boolean
  tailLength?: number
  text: string
  textProps?: TextProps
  tooltipProps?: Omit<TooltipProps, 'children'>
}) => {
  const truncated = truncate(text, {
    headLength,
    tailLength,
    disabled,
  })
  const isDisabled = disabled || truncated === text
  return (
    <Tooltip {...tooltipProps} hasArrow label={text} isDisabled={isDisabled}>
      <Text {...textProps}>{truncated}</Text>
    </Tooltip>
  )
}
