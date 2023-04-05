import { truncate } from 'util/helpers'

import { useClipboard } from 'hooks/chakra-hooks'
import { useToastBottom } from 'hooks/use-toasts'

import { type TextProps, type TooltipProps, Text, Tooltip } from '@/atoms'

export const Truncate = ({
  clickToCopy = false,
  disabled = false,
  headLength,
  tailLength,
  text,
  textProps,
  tooltipProps,
}: {
  clickToCopy?: boolean
  disabled?: boolean
  headLength?: number
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
  const { onCopy } = useClipboard(text)
  const { toastInfo } = useToastBottom()

  function handleCopy() {
    toastInfo('Address copied to clipboard!')
    onCopy()
  }

  return (
    <Tooltip
      {...tooltipProps}
      hasArrow
      label={text}
      isDisabled={isDisabled}
      closeOnClick={false}
    >
      <Text
        {...textProps}
        onClick={clickToCopy ? handleCopy : undefined}
        cursor={clickToCopy ? 'copy' : undefined}
      >
        {truncated}
      </Text>
    </Tooltip>
  )
}
