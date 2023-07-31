import { useState } from 'react'

import type { ProposalSendFormValues, ProposalSendType } from 'types'
import { UICoin } from 'types'
import { SPACING } from 'util/constants'

import { /* FormControl, FormLabel, RadioGroup, */ Stack } from '@/atoms'
import { FormCard } from '@/molecules/form-card'

// import { RadioGroupOptions } from '@/molecules/radio-group-options'
import { SingleForm, type SingleFormValues } from './send-single-form'

// TODO(##47): add "multi" send to send action create flow
// const sendOptions: { label: string; value: ProposalSendType }[] = [
//   { label: 'Single', value: 'single' },
//   // { label: 'Multiple', value: 'multi' },
// ]

export const ProposalSendForm = ({
  defaultValues,
  formId,
  policyBalances,
  onError,
  onSubmit,
}: {
  defaultValues: ProposalSendFormValues
  formId: string
  policyBalances: UICoin[]
  onError: () => void
  onSubmit: (values: ProposalSendFormValues) => void
}) => {
  const [sendType /* , setSendType */] = useState<ProposalSendType>('single')
  function renderForm() {
    const baseProps = {
      formId,
      onSubmit,
      onError,
      policyBalances,
    }
    switch (sendType) {
      case 'single':
      default:
        return (
          <SingleForm
            {...baseProps}
            key={formId + '-single'} // force re-render when toggling between forms
            defaultValues={defaultValues as SingleFormValues}
          />
        )
    }
  }
  return (
    <FormCard title="Send">
      <Stack spacing={SPACING.formStack}>
        {/*TODO(#47): add "multi" send to send action create flow*/}
        {/*<FormControl>*/}
        {/*  <FormLabel>Type</FormLabel>*/}
        {/*  <RadioGroup*/}
        {/*    onChange={(val) => setSendType(val as ProposalSendType)}*/}
        {/*    defaultValue={sendType}*/}
        {/*  >*/}
        {/*    <RadioGroupOptions options={sendOptions} selected={sendType} />*/}
        {/*  </RadioGroup>*/}
        {/*</FormControl>*/}
        {renderForm()}
      </Stack>
    </FormCard>
  )
}
