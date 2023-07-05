import { Stack } from '@chakra-ui/react'

import { ProposalSendFormValues } from 'types'
import { SPACING } from 'util/constants'

import { FormCard } from './form-card'
import { ReviewItem } from './review-item'
import { Truncate } from './truncate'

export const SendReview = ({
  groupPolicyAddress,
  values,
}: {
  groupPolicyAddress: string
  values: ProposalSendFormValues
}) => {
  return (
    <FormCard title="Send">
      <Stack spacing={SPACING.formStack}>
        <ReviewItem label="Type">{values.sendType}</ReviewItem>
        <ReviewItem label="From Address">
          <Truncate
            clickToCopy
            headLength={18}
            tailLength={18}
            text={groupPolicyAddress}
          />
        </ReviewItem>
        {'toAddress' in values && (
          <ReviewItem label="To Address">{values.toAddress}</ReviewItem>
        )}
        <ReviewItem label="Amount">{`${values.amount} ${values.denom}`}</ReviewItem>
      </Stack>
    </FormCard>
  )
}
