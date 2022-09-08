import { Bech32Address } from '../bech32'

export const isBech32Address = (address: string): boolean => {
  if (address.length < 10) return false
  try {
    Bech32Address.validate(address)
    return true
  } catch (error) {
    return false
  }
}

export const isJSON = (str: string): boolean => {
  // allow empty strings - this could be problematic if we go to parse later
  if (!str.length) return true
  try {
    JSON.parse(str)
    return true
  } catch (err) {
    return false
  }
}
