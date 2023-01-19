import { throwError } from 'util/errors'

import { Query } from 'store/query.store'

export async function fetchAllBalances(address?: string) {
  if (!Query.bank) throwError('Wallet not properly initialized')
  if (!address) throwError('Address is required')
  try {
    const data = await Query.bank.allBalances({ address })
    // const data2 = await Query.bank.balance({ address, denom: 'STAKE' })
    console.log('data :>> ', data)
    // console.log('data2 :>> ', data2)
    return data.balances
  } catch (error) {
    throwError(error)
  }
}
