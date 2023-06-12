import { Fragment } from 'react'

import type {
  ProposalAction,
  ProposalFormValues,
  ProposalSendFormValues,
  ProposalStakeFormValues,
} from 'types'
import { SPACING } from 'util/constants'

import { Heading, Stack, Text } from '@/atoms'
import { FormCard } from '@/molecules/form-card'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'
import { ReviewItem } from '@/molecules/review-item'
import { Truncate } from '@/molecules/truncate'

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
        {'amount' in values && <ReviewItem label="Amount">{`${values.amount} ${values.denom}`}</ReviewItem>}
      </Stack>
    </FormCard>
  )
}
