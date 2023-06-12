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

export const isJson = (str: string): boolean => {
  try {
    const result = JSON.parse(str)
    const type = Object.prototype.toString.call(result)
    return type === '[object Object]' || type === '[object Array]'
  } catch (err) {
    return false
  }
}
