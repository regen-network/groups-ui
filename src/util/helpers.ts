import type { StdFee } from '@cosmjs/stargate'

import type { NumOrEmpty } from 'types/form.types'

export function openExternalLink(url: string) {
  return window.open(url, '_blank', 'noopener,noreferrer')
}

export function truncate(
  str: string,
  options?: {
    headLength?: number
    tailLength?: number
    disabled?: boolean
  },
) {
  const headLength = options?.headLength || 10
  const tailLength = options?.tailLength || 6
  const mask = '...'
  const truncatedLen = headLength + tailLength + mask.length
  if (str.length <= truncatedLen || options?.disabled) return str
  const head = str.substring(0, headLength)
  const tail = str.substring(str.length - tailLength, str.length)
  return head + mask + tail
}

/** takes an int value and converts to a percentage string
 * @example
 * ```ts
 * numToPercent(51) // '0.51'
 * numToPercent(0) // '0'
 * numToPercent('bob') // ''
 * ```
 */
export const numToPercentStr = (n: number): string => `${n / 100}`

/** takes a string value and converts to a percentage integer
 * @example
 * ```ts
 * percentStrToNum('0.51') // 51
 * ```
 */
export const percentStrToNum = (str: string): number => parseFloat(str) * 100

/** takes a positive string number, returns the integer form, or
 * an empty string for undefined values. Mainly for form `onChange`
 * @example
 * ```
 * strToNumOrEmpty('1') // 1
 * strToNumOrEmpty('1.1') // 1
 * strToNumOrEmpty('bob') // ''
 * strToNumOrEmpty(undefined) // ''
 * ```
 */
export function strToNumOrEmpty(s?: string): NumOrEmpty {
  if (!s) return ''
  const n = parseInt(s)
  return !isNaN(n) ? n : ''
}

/** change `''` empty string values used in forms to `undefined`  */
export const clearEmptyStr = (n?: NumOrEmpty): number | undefined => {
  return !n ? undefined : n
}

/** take a @cosmjs/stargate `StdFee` object, return formatted string */
export function formatFee(fee?: StdFee): string | null {
  if (!fee) return null
  const [{ amount, denom }] = fee.amount
  return `${amount} ${denom}`
}

export function getFeeDenom(fee?: StdFee): string {
  if (!fee) return '-'
  const [{ denom }] = fee.amount
  return denom
}

/** basic UUID generator */
export function uuid(): string {
  const dateStr = Date.now().toString(36) // convert num to base 36 and stringify
  const randomStr = Math.random().toString(36).substring(2, 8) // start at index 2 to skip decimal point
  return `${dateStr}-${randomStr}`
}
