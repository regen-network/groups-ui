import { z } from 'zod'

import { Bech32Address } from './bech32'

const isBech32Address = (address: string): boolean => {
  if (address.length < 10) return false
  try {
    Bech32Address.validate(address)
    return true
  } catch (error) {
    console.error('invalid bech32 address', error)
    return false
  }
}

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])
type Literal = z.infer<typeof literalSchema>
type Json = Literal | { [key: string]: Json } | Json[]
const validJson: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(validJson), z.record(validJson)]),
)

const validAddress = z.string().refine(isBech32Address, 'Must be a valid Bech32 address')
const validMember = z.object({
  address: validAddress,
  weight: z.number().min(0, 'Must be 0 or a positive number'),
  // metadata: z.string().optional() // TODO: ?
})

export const valid = {
  name: z.string().min(2).max(30, 'Name is required'),
  string: z.string().min(2),
  address: validAddress,
  groupOrAddress: z.union([
    z.string().min(1, 'Must select a value'),
    validAddress,
    z.literal('group'),
  ]),
  member: validMember,
  json: validJson,
  url: z.string().url(),
}
