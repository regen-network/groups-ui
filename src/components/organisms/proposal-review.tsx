import { Fragment } from 'react'

import type {
  ProposalAction,
  ProposalFormValues,
  ProposalSendFormValues,
  ProposalStakeFormValues,
  ProposalUpdateGroupFormValues,
} from 'types'
import { SPACING } from 'util/constants'

import { Heading, Stack, Text } from '@/atoms'
import { FormCard } from '@/molecules/form-card'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'
import { SendReview } from '@/molecules/proposal-send-review'
import { StakeReview } from '@/molecules/proposal-stake-review'
import { UpdateGroupReview } from '@/molecules/proposal-update-group-review'
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
    case 'update-group':
      return <UpdateGroupReview values={action.values as ProposalUpdateGroupFormValues} />
    default:
      return null
  }
}
