import { PageRequest } from '@osmonauts/helpers'

import { throwError } from 'util/errors'

import { Query } from 'store/query.store'

import { toCoin } from './bank.utils'

export async function fetchAllBalances(address?: string) {
  if (!Query.bank) throwError('Wallet not properly initialized')
  if (!address) throwError('Address is required')
  try {
    const data = await Query.bank.allBalances({
      address,
      pagination: { countTotal: true } as PageRequest,
    })
    return data.balances.map(toCoin)
  } catch (error) {
    throwError(error)
  }
}
