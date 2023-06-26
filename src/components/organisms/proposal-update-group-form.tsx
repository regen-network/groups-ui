import { useState } from 'react'

import type { ProposalUpdateGroupFormValues, ProposalUpdateGroupType } from 'types'
import { UICoin } from 'types'
import { SPACING } from 'util/constants'

import { FormControl, FormLabel, RadioGroup, Stack } from '@/atoms'
import { FormCard } from '@/molecules/form-card'
import { RadioGroupOptions } from '@/molecules/radio-group-options'

import { ClaimForm, type ClaimFormValues } from './stake-claim-form'
import { DelegateForm, type DelegateFormValues } from './stake-delegate-form'
import { RedelegateForm, type RedelegateFormValues } from './stake-redelegate-form'
import { UndelegateForm, type UndelegateFormValues } from './stake-undelegate-form'
import {
  DecisionPolicyForm,
  DecisionPolicyFormValues,
} from './update-group-decision-policy-form'

const updateGroupOptions: { label: string; value: ProposalUpdateGroupType }[] = [
  { label: 'Update group decision policy', value: 'decision-policy' },
  { label: 'Update group members', value: 'members' },
  // { label: 'Update group metadata', value: 'metadata' },
]

export const ProposalUpdateGroupForm = ({
  defaultValues,
  formId,
  onError,
  onSubmit,
}: {
  defaultValues: ProposalUpdateGroupFormValues
  formId: string
  onError: () => void
  onSubmit: (values: ProposalUpdateGroupFormValues) => void
}) => {
  const [updateGroupType, setUpdateGroupType] =
    useState<ProposalUpdateGroupType>('decision-policy')
  function renderForm() {
    const baseProps = {
      formId,
      onSubmit,
      onError,
    }
    switch (updateGroupType) {
      case 'decision-policy':
      default:
        return (
          <DecisionPolicyForm
            {...baseProps}
            defaultValues={
              {
                ...defaultValues,
                updateGroupType: 'decision-policy',
              } as DecisionPolicyFormValues
            }
          />
        )
    }
  }
  return (
    <FormCard title="Update group">
      <Stack spacing={SPACING.formStack}>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <RadioGroup
            onChange={(val) => setUpdateGroupType(val as ProposalUpdateGroupType)}
            defaultValue={updateGroupType}
          >
            <RadioGroupOptions options={updateGroupOptions} selected={updateGroupType} />
          </RadioGroup>
        </FormControl>
        {renderForm()}
      </Stack>
    </FormCard>
  )
}
