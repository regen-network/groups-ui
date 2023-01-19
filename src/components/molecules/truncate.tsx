import { truncate } from 'util/helpers'

import { useClipboard } from 'hooks/chakra'
import { useToastCopied } from 'hooks/useToasts'

import {
  type TextProps,
  type TooltipProps,
  Text,
  Tooltip,
} from '@/atoms/chakra-components'

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
  const toastCopied = useToastCopied('Address copied to clipboard!')

  function handleCopy() {
    toastCopied()
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
