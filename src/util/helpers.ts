import { mapKeys } from 'remeda'

export const openExternalLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

export const truncate = (str: string, maxLength = 12) => {
  if (str.length > maxLength) {
    const head = str.substring(0, 9)
    const tail = str.substring(str.length - 4, str.length)
    return head + '...' + tail
  }
  return str
}

export const intToPercent = (int: number) => {
  return int / 100
}

// eslint-disable-next-line
export function toCamelKeys<T>(obj: Record<any, any>) {
  return mapKeys(obj, snakeToCamel) as T
}

function snakeToCamel(str: string) {
  return str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
}
