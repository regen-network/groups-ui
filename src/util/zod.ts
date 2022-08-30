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

const validBech32Address = z
  .string()
  .refine(isBech32Address, 'Must be a valid Bech32 address')

const validMember = z.object({
  address: validBech32Address,
  weight: z.number().min(0, 'Must be 0 or a positive number'),
  // metadata: z.string().optional() // TODO: ?
})

export const valid = {
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters'),
  string: z.string().min(2),
  bech32: validBech32Address,
  groupOrAddress: z.union([
    z.string().min(1, 'Must select a value'),
    validBech32Address,
    z.literal('group'),
  ]),
  member: validMember,
  json: validJson,
  url: z.string().url(),
}
