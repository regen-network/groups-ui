import { z } from 'zod'

import { isBech32Address, isJSON } from './validators'

const bech32Address = z.string().refine(isBech32Address, 'Must be a  Bech32 address')

const member = z.object({
  address: bech32Address,
  weight: z.number().min(0, 'Must be 0 or a positive number'),
  // metadata: z.string().optional() // TODO: ?
})

const members = member.array().min(1, 'Must have at least one member')

const json = z.string().refine(isJSON, 'Must be a valid JSON string')

const name = z
  .string()
  .min(1, 'Name is required')
  .max(50, 'Name must be less than 50 characters')

const description = z
  .string()
  .min(4, 'Description is too short')
  .max(320, 'Description is too long') // TODO is this too short?

const percent = z
  .number()
  .min(1, 'Must be greater than zero')
  .max(100, 'Must be less than 100')

const positiveNumber = z.number().positive('Must be a positive number')

const emptyStr = z.literal('')

const boolStr = z.union([z.literal('true'), z.literal('false')])
const url = z.string().url('Must be a valid URL')
const positiveNumStrRegex = /^[+]?([.]\d+|\d+[.]?\d*)$/
const amount = z.string().regex(positiveNumStrRegex, 'Must be a positive number')

// unions

const admin = z.union([
  z.string().min(1, 'Must select a value'),
  bech32Address,
  z.literal('group'),
])

const groupOrAddress = z.union([
  z.string().min(1, 'Must select a value'),
  bech32Address,
  z.literal('group'),
])

const positiveNumberOrEmptyStr = z.union([positiveNumber, emptyStr])
const percentOrEmptyStr = z.union([percent, emptyStr])

export const valid = {
  admin,
  amount,
  bech32Address,
  emptyStr,
  boolStr,
  name,
  description,
  groupOrAddress,
  members,
  json,
  url,
  positiveNumber,
  percent,
  positiveNumberOrEmptyStr,
  percentOrEmptyStr,
}
