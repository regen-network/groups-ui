export const openExternalLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

export const truncate = (
  str: string,
  options?: { headLength?: number; tailLength?: number },
) => {
  // const { headLength, tailLength } = options
  const headLength = options?.headLength || 9
  const tailLength = options?.tailLength || 4
  if (str.length > headLength + tailLength + 3) {
    const head = str.substring(0, headLength)
    const tail = str.substring(str.length - tailLength, str.length)
    return head + '...' + tail
  }
  return str
}

/** takes an int value and converts to a percentage string
 * @example
 * ```ts
 * intToPercent(51) // '0.51'
 * ```
 */
export const intToPercent = (int: number) => `${int / 100}`

/** takes a string value and converts to a percentage integer
 * @example
 * ```ts
 * percentStrToInt('0.51') // 51
 * ```
 */
export const percentToInt = (percentStr: string) => parseFloat(percentStr) * 100
