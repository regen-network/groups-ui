import { useState } from 'react'

import type { ProposalSendFormValues, ProposalSendType } from 'types'
import { SPACING } from 'util/constants'

import { FormControl, FormLabel, RadioGroup, Stack } from '@/atoms'
import { FormCard } from '@/molecules/form-card'
import { RadioGroupOptions } from '@/molecules/radio-group-options'

import { type SingleFormValues, SingleForm } from './send-single-form'

const sendOptions: { label: string; value: ProposalSendType }[] = [
  { label: 'Single', value: 'single' },
  // { label: 'Multiple', value: 'multi' }, // TODO
]

export const ProposalSendForm = ({
  defaultValues,
  formId,
  maxAmount,
  onError,
  onSubmit,
}: {
  defaultValues: ProposalSendFormValues
  formId: string
  maxAmount: string
  onError: () => void
  onSubmit: (values: ProposalSendFormValues) => void
}) => {
  const [sendType, setSendType] = useState<ProposalSendType>('single')
  function renderForm() {
    const baseProps = {
      formId,
      onSubmit,
      onError,
      maxAmount,
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
