import { z } from 'zod'

import { isBech32Address, isJSON } from './validators'

const validBech32Address = z
  .string()
  .refine(isBech32Address, 'Must be a valid Bech32 address')

const validMember = z.object({
  address: validBech32Address,
  weight: z.number().min(0, 'Must be 0 or a positive number'),
  // metadata: z.string().optional() // TODO: ?
})

const validMembers = validMember.array().min(1, 'Must have at least one member')

const validJSON = z.string().refine(isJSON, 'Must be a valid JSON string')

const validName = z
  .string()
  .min(1, 'Name is required')
  .max(50, 'Name must be less than 50 characters')

const validGroupOrAddress = z.union([
  z.string().min(1, 'Must select a value'),
  validBech32Address,
  z.literal('group'),
])

const validDescription = z
  .string()
  .min(4, 'Description is too short')
  .max(320, 'Description is too long') // TODO is this too short?

export const valid = {
  name: validName,
  description: validDescription,
  bech32: validBech32Address,
  groupOrAddress: validGroupOrAddress,
  member: validMember,
  members: validMembers,
  json: validJSON,
  url: z.string().url(),
}
