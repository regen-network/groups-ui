import { useState } from 'react'

import type { ProposalStakeFormValues, ProposalStakeType } from 'types'
import { UICoin } from 'types'
import { SPACING } from 'util/constants'

import { FormControl, FormLabel, RadioGroup, Stack } from '@/atoms'
import { FormCard } from '@/molecules/form-card'
import { RadioGroupOptions } from '@/molecules/radio-group-options'

import { ClaimForm, type ClaimFormValues } from './stake-claim-form'
import { DelegateForm, type DelegateFormValues } from './stake-delegate-form'
import { RedelegateForm, type RedelegateFormValues } from './stake-redelegate-form'
import { UndelegateForm, type UndelegateFormValues } from './stake-undelegate-form'

const stakeOptions: { label: string; value: ProposalStakeType }[] = [
  { label: 'Delegate', value: 'delegate' },
  { label: 'Redelegate', value: 'redelegate' },
  { label: 'Undelegate', value: 'undelegate' },
  { label: 'Claim Reward', value: 'claim' },
]

export const ProposalStakeForm = ({
  defaultValues,
  formId,
  policyBalances,
  onError,
  onSubmit,
}: {
  defaultValues: ProposalStakeFormValues
  formId: string
  policyBalances: UICoin[]
  onError: () => void
  onSubmit: (values: ProposalStakeFormValues) => void
}) => {
  const [stakeType, setStakeType] = useState<ProposalStakeType>('delegate')
  function renderForm() {
    const baseProps = {
      formId,
      onSubmit,
      onError,
      policyBalances,
    }
    switch (stakeType) {
      case 'claim':
        return (
          <ClaimForm
            {...baseProps}
            defaultValues={{ ...defaultValues, stakeType: 'claim' } as ClaimFormValues}
          />
        )
      case 'redelegate':
        return (
          <RedelegateForm
            {...baseProps}
            defaultValues={
              { ...defaultValues, stakeType: 'redelegate' } as RedelegateFormValues
            }
          />
        )
      case 'undelegate':
        return (
          <UndelegateForm
            {...baseProps}
            defaultValues={
              { ...defaultValues, stakeType: 'undelegate' } as UndelegateFormValues
            }
          />
        )
      case 'delegate':
      default:
        return (
          <DelegateForm
            {...baseProps}
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
