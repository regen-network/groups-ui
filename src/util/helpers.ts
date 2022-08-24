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
