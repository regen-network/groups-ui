import { Fragment } from 'react'
import { useSnapshot } from 'valtio'

import type { ProposalAction, ProposalFormValues, ProposalStakeFormValues } from 'types'
import { SPACING } from 'util/constants'
import { formatFee } from 'util/helpers'

import { Chain } from 'store/chain.store'

import { Heading, Stack, Text } from '@/atoms'
import { FormCard } from '@/molecules/form-card'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'
import { ReviewItem } from '@/molecules/review-item'

export const ProposalReview = (props: {
  values: ProposalFormValues
  groupName: string
  onPrev: () => void
  onSubmit: () => void
}) => {
  const {
    values: { actions, title, description },
  } = props
  return (
    <Stack spacing={8}>
      <FormCard>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            props.onSubmit()
          }}
        >
          <Stack spacing={SPACING.formStack}>
            <Stack spacing={8}>
              <Heading>{title}</Heading>
              <Text>{description}</Text>
            </Stack>
            <ReviewItem label="Group:">{props.groupName}</ReviewItem>
          </Stack>
          <FormSubmitHiddenButton id="proposal-review" />
        </form>
      </FormCard>
      {actions.map((action, i) => {
        return <Fragment key={'review-action-' + i}>{renderAction(action)}</Fragment>
      })}
    </Stack>
  )
}

function renderAction(action: ProposalAction) {
  switch (action.type) {
    case 'stake':
      return <StakeReview values={action.values as ProposalStakeFormValues} />
    default:
      return null
  }
}

const StakeReview = ({ values }: { values: ProposalStakeFormValues }) => {
  const { fee } = useSnapshot(Chain)
  return (
    <FormCard title="Stake">
      <Stack spacing={SPACING.formStack}>
        <ReviewItem label="Type">{values.stakeType}</ReviewItem>
        {'validator' in values && (
          <ReviewItem label="Validator">{values.validator}</ReviewItem>
        )}
        {'fromValidator' in values && (
          <ReviewItem label="From validator">{values.fromValidator}</ReviewItem>
        )}
        {'toValidator' in values && (
          <ReviewItem label="To validator">{values.toValidator}</ReviewItem>
        )}
        <ReviewItem label="Amount">{values.amount}</ReviewItem>
        <ReviewItem label="Transaction Fee">{formatFee(fee)}</ReviewItem>
      </Stack>
    </FormCard>
  )
}
