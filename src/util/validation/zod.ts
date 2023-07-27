import { z } from 'zod'

import { isBech32Address, isJson } from './validators'

const bech32Address = z.string().refine(isBech32Address, 'Must be a  Bech32 address')
const member = z.object({
  address: bech32Address,
  weight: z.number().min(0, 'Must be 0 or a positive number'),
  // metadata: z.string().optional() // TODO(#97): support for group member metadata
})
const members = member.array().min(1, 'Must have at least one member')
const json = z.string().refine(isJson, 'Must be a valid JSON string')
const name = z
  .string()
  .min(1, 'Name is required')
  .max(50, 'Name must be less than 50 characters')
const description = z
  .string()
  .min(4, 'Description is too short')
  .max(320, 'Description is too long')
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
const denomStrRegex = /^[a-zA-Z][a-zA-Z0-9/:._-]{2,127}$/
const denom = z.string().regex(denomStrRegex, 'Must be a valid denomination')

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
  boolStr,
  denom,
  description,
  emptyStr,
  groupOrAddress,
  json,
  members,
  name,
  percent,
  percentOrEmptyStr,
  positiveNumber,
  positiveNumberOrEmptyStr,
  url,
}
