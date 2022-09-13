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

const validAdmin = z.union([
  z.string().min(1, 'Must select a value'),
  validBech32Address,
  z.literal('group'),
])

const validEmptyStr = z.literal('')
const validBoolStr = z.union([z.literal('true'), z.literal('false')])

const validPositiveNumStr = z
  .string()
  .refine((s) => s.length === 0 || Number(s) > 0, 'Must be a positive number')

const validPercentStr = z
  .string()
  .refine(
    (s) => s.length === 0 || (Number(s) > 0 && Number(s) <= 100),
    'Must be between 0 and 100',
  )

export const valid = {
  admin: validAdmin,
  bech32: validBech32Address,
  emptyStr: validEmptyStr,
  boolStr: validBoolStr,
  name: validName,
  description: validDescription,
  groupOrAddress: validGroupOrAddress,
  members: validMembers,
  json: validJSON,
  url: z.string().url(),
  positiveNumStr: validPositiveNumStr,
  percentStr: validPercentStr,
}
