import { Fragment } from 'react'
import { useSnapshot } from 'valtio'

import type {
  ProposalAction,
  ProposalFormValues,
  ProposalSendFormValues,
  ProposalStakeFormValues,
} from 'types'
import { truncateAddress } from 'util/address'
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
  groupPolicyAddress: string
  onPrev: () => void
  onSubmit: () => void
}) => {
  const {
    values: { actions, title, summary: description },
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
        return (
          <Fragment key={'review-action-' + i}>
            {renderAction(action, props.groupPolicyAddress)}
          </Fragment>
        )
      })}
    </Stack>
  )
}

function renderAction(action: ProposalAction, groupPolicyAddress: string) {
  switch (action.type) {
    case 'send':
      return (
        <SendReview
          groupPolicyAddress={groupPolicyAddress}
          values={action.values as ProposalSendFormValues}
        />
      )
    case 'stake':
      return (
        <StakeReview
          groupPolicyAddress={groupPolicyAddress}
          values={action.values as ProposalStakeFormValues}
        />
      )
    default:
      return null
  }
}

const SendReview = ({
  groupPolicyAddress,
  values,
}: {
  groupPolicyAddress: string
  values: ProposalSendFormValues
}) => {
  const { fee } = useSnapshot(Chain)
  return (
    <FormCard title="Send">
      <Stack spacing={SPACING.formStack}>
        <ReviewItem label="Type">{values.sendType}</ReviewItem>
        <ReviewItem label="From Address">
          {truncateAddress(groupPolicyAddress)}
        </ReviewItem>
        {'toAddress' in values && (
          <ReviewItem label="To Address">{values.toAddress}</ReviewItem>
        )}
        {/* TODO(#19): add support for currencies other than staking denom */}
        <ReviewItem label="Amount">{values.amount + ' REGEN'}</ReviewItem>
        <ReviewItem label="Transaction Fee">{formatFee(fee)}</ReviewItem>
      </Stack>
    </FormCard>
  )
}

const StakeReview = ({
  groupPolicyAddress,
  values,
}: {
  groupPolicyAddress: string
  values: ProposalStakeFormValues
}) => {
  const { fee } = useSnapshot(Chain)
  return (
    <FormCard title="Stake">
      <Stack spacing={SPACING.formStack}>
        <ReviewItem label="Type">{values.stakeType}</ReviewItem>
        <ReviewItem label="Delegator">{truncateAddress(groupPolicyAddress)}</ReviewItem>
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
