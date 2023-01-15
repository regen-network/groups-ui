import { Fragment } from 'react'
import { useSnapshot } from 'valtio'

import type {
  ProposalAction,
  ProposalFormValues,
  ProposalStakeFormValues,
  ProposalTextFormValues,
} from 'types'
import { formatFee } from 'util/helpers'
import { SPACING } from 'util/style.constants'

import { Chain } from 'store'

import { Heading, Stack, Text } from '@/atoms'
import { FormCard } from '@/molecules'
import { useFormFooter } from '@/molecules/form-footer'
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
  useFormFooter({ onPrev: props.onPrev, onSubmit: props.onSubmit })
  return (
    <Stack spacing={8}>
      <FormCard>
        <Stack spacing={SPACING.formStack}>
          <Stack spacing={8}>
            <Heading>{title}</Heading>
            <Text>{description}</Text>
          </Stack>
          <ReviewItem label="Group:">{props.groupName}</ReviewItem>
        </Stack>
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
    case 'text':
      return <TextReview values={action.values as ProposalTextFormValues} />
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

const TextReview = ({ values }: { values: ProposalTextFormValues }) => {
  const { fee } = useSnapshot(Chain)
  return (
    <FormCard title="Text">
      <Stack spacing={SPACING.formStack}>
        <ReviewItem label="Proposal Text">{values.text}</ReviewItem>
        <ReviewItem label="Transaction Fee">{formatFee(fee)}</ReviewItem>
      </Stack>
    </FormCard>
  )
}
