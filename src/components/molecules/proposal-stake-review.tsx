import { Stack } from '@chakra-ui/react'

import { ProposalStakeFormValues } from 'types'
import { SPACING } from 'util/constants'

import { FormCard } from './form-card'
import { ReviewItem } from './review-item'
import { Truncate } from './truncate'

export const StakeReview = ({
  groupPolicyAddress,
  values,
}: {
  groupPolicyAddress: string
  values: ProposalStakeFormValues
}) => {
  return (
    <FormCard title="Stake">
      <Stack spacing={SPACING.formStack}>
        <ReviewItem label="Type">{values.stakeType}</ReviewItem>
        <ReviewItem label="Delegator">
          <Truncate
            clickToCopy
            headLength={18}
            tailLength={18}
            text={groupPolicyAddress}
          />
        </ReviewItem>
        {'validator' in values && (
          <ReviewItem label="Validator">{values.validator}</ReviewItem>
        )}
        {'fromValidator' in values && (
          <ReviewItem label="From validator">{values.fromValidator}</ReviewItem>
        )}
        {'toValidator' in values && (
          <ReviewItem label="To validator">{values.toValidator}</ReviewItem>
        )}
        {'amount' in values && (
          <ReviewItem label="Amount">{`${values.amount} ${values.denom}`}</ReviewItem>
        )}
      </Stack>
    </FormCard>
  )
}
