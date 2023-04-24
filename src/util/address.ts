export function truncateAddress(address: string) {
  return address.slice(0, 12) + '...' + address.slice(address.length - 12, address.length)
}
