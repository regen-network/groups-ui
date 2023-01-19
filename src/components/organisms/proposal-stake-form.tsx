import { useState } from 'react'

import type { ProposalStakeFormValues, ProposalStakeType } from 'types'
import { SPACING } from 'util/style.constants'

import { FormControl, FormLabel, RadioGroup, Stack } from '@/atoms'
import { FormCard } from '@/molecules/form-card'
import { RadioGroupOptions } from '@/molecules/radio-group-options'

import { type ClaimFormValues, ClaimForm } from './stake-claim-form'
import { type DelegateFormValues, DelegateForm } from './stake-delegate-form'
import { type RedelegateFormValues, RedelegateForm } from './stake-redelegate-form'

const stakeOptions: { label: string; value: ProposalStakeType }[] = [
  { label: 'Delegate', value: 'delegate' },
  { label: 'Redelegate', value: 'redelegate' },
  { label: 'Undelegate', value: 'undelegate' },
  { label: 'Claim reward', value: 'claim' },
]

export const ProposalStakeForm = ({
  defaultValues,
  formId,
  onSubmit,
  onError,
}: {
  defaultValues: ProposalStakeFormValues
  formId: string
  onSubmit: (values: ProposalStakeFormValues) => void
  onError: () => void
}) => {
  const [stakeType, setStakeType] = useState<ProposalStakeType>('delegate')
  function renderForm() {
    const baseProps = {
      formId,
      onSubmit,
      onError,
      maxAmount: '1000',
    }
    switch (stakeType) {
      case 'claim':
        return (
          <ClaimForm {...baseProps} defaultValues={defaultValues as ClaimFormValues} />
        )
      case 'redelegate':
        return (
          <RedelegateForm
            {...baseProps}
            defaultValues={defaultValues as RedelegateFormValues}
          />
        )
      case 'undelegate':
        return (
          <DelegateForm
            {...baseProps}
            key={formId}
            defaultValues={
              { ...defaultValues, stakeType: 'undelegate' } as DelegateFormValues
            }
          />
        )
      case 'delegate':
      default:
        return (
          <DelegateForm
            {...baseProps}
            key={formId} // force re-render when toggling between delegate / undelegate
            defaultValues={defaultValues as DelegateFormValues}
          />
        )
    }
  }
  return (
    <FormCard title="Stake">
      <Stack spacing={SPACING.formStack}>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <RadioGroup
            onChange={(val) => setStakeType(val as ProposalStakeType)}
            defaultValue={stakeType}
          >
            <RadioGroupOptions options={stakeOptions} selected={stakeType} />
          </RadioGroup>
        </FormControl>
        {renderForm()}
      </Stack>
    </FormCard>
  )
}
