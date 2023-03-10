import { throwError } from 'util/errors'

import { Chain } from 'store/chain.store'
import { Query } from 'store/query.store'

export async function fetchValidators() {
  if (!Query.staking) throwError('Wallet not properly initialized')
  try {
    const { validators } = await Query.staking.validators({ status: '' })
    Chain.validators = validators
    return validators
  } catch (error) {
    throwError(error)
  }
}
