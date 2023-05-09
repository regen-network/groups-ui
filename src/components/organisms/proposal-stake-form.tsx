import { useState } from 'react'

import type { ProposalStakeFormValues, ProposalStakeType } from 'types'
import { SPACING } from 'util/constants'

import { FormControl, FormLabel, RadioGroup, Stack } from '@/atoms'
import { FormCard } from '@/molecules/form-card'
import { RadioGroupOptions } from '@/molecules/radio-group-options'

import { ClaimForm, type ClaimFormValues } from './stake-claim-form'
import { DelegateForm, type DelegateFormValues } from './stake-delegate-form'
import { RedelegateForm, type RedelegateFormValues } from './stake-redelegate-form'

const stakeOptions: { label: string; value: ProposalStakeType }[] = [
  { label: 'Delegate', value: 'delegate' },
  { label: 'Redelegate', value: 'redelegate' },
  { label: 'Undelegate', value: 'undelegate' },
  { label: 'Claim reward', value: 'claim' },
]

export const ProposalStakeForm = ({
  defaultValues,
  formId,
  maxStakeAmount,
  onError,
  onSubmit,
}: {
  defaultValues: ProposalStakeFormValues
  formId: string
  maxStakeAmount: string
  onError: () => void
  onSubmit: (values: ProposalStakeFormValues) => void
}) => {
  const [stakeType, setStakeType] = useState<ProposalStakeType>('delegate')
  function renderForm() {
    const baseProps = {
      formId,
      onSubmit,
      onError,
      maxAmount: maxStakeAmount,
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
            key={formId + '-undelegate'}
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
            key={formId + '-delegate'} // force re-render when toggling between delegate / undelegate
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
