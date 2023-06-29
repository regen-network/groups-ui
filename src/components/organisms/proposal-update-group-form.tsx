import { useMemo, useState } from 'react'

import type {
  GroupFormValues,
  GroupPolicyFormValues,
  ProposalUpdateGroupFormValues,
  ProposalUpdateGroupType,
} from 'types'
import { SPACING } from 'util/constants'

import { FormControl, FormLabel, RadioGroup, Stack } from '@/atoms'
import { FormCard } from '@/molecules/form-card'
import { RadioGroupOptions } from '@/molecules/radio-group-options'

import { DecisionPolicyForm } from './update-group-decision-policy-form'
import { MembersForm } from './update-group-members-form'

const updateGroupOptions: { label: string; value: ProposalUpdateGroupType }[] = [
  { label: 'Update group decision policy', value: 'decision-policy' },
  { label: 'Update group members', value: 'members' },
  { label: 'Update group metadata', value: 'metadata' },
]

export const ProposalUpdateGroupForm = ({
  defaultValues,
  formId,
  onError,
  onSubmit,
  policyAsGroupAdmin,
  policyAsPolicyAdmin,
  initialPolicyValues,
  initialGroupValues,
}: {
  defaultValues: ProposalUpdateGroupFormValues
  formId: string
  onError: () => void
  onSubmit: (values: ProposalUpdateGroupFormValues) => void
  policyAsGroupAdmin?: boolean
  policyAsPolicyAdmin?: boolean
  initialPolicyValues: GroupPolicyFormValues
  initialGroupValues: GroupFormValues
}) => {
  const [formDefaultValues, setFormDefaultValues] =
    useState<ProposalUpdateGroupFormValues>(defaultValues)

  function renderForm() {
    const baseProps = {
      formId,
      onSubmit,
      onError,
    }
    switch (formDefaultValues.updateGroupType) {
      case 'decision-policy':
      default:
        return <DecisionPolicyForm {...baseProps} defaultValues={formDefaultValues} />
      case 'members':
        return <MembersForm {...baseProps} defaultValues={formDefaultValues} />
    }
  }

  function onChange(val: string) {
    const updateGroupType = val as ProposalUpdateGroupType
    switch (updateGroupType) {
      case defaultValues.updateGroupType:
        setFormDefaultValues(defaultValues)
        break
      case 'decision-policy':
        setFormDefaultValues({ ...initialPolicyValues, updateGroupType })
        break
      case 'members':
        setFormDefaultValues({ members: initialGroupValues.members, updateGroupType })
        break
      // case 'metadata':
      //   setFormDefaultValues({ TODO, updateGroupType })
      //   break
      default:
        break
    }
  }
  const options = useMemo(() => {
    if (!policyAsPolicyAdmin)
      return updateGroupOptions.filter((o) => o.value === 'decision-policy')
    if (!policyAsGroupAdmin)
      return updateGroupOptions.filter(
        (o) => o.value === 'members' || o.value === 'metadata',
      )
    return updateGroupOptions
  }, [policyAsGroupAdmin, policyAsPolicyAdmin])

  return (
    <FormCard title="Update group">
      <Stack spacing={SPACING.formStack}>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <RadioGroup
            onChange={onChange}
            defaultValue={formDefaultValues.updateGroupType}
          >
            <RadioGroupOptions
              options={options}
              selected={formDefaultValues.updateGroupType}
            />
          </RadioGroup>
        </FormControl>
        {renderForm()}
      </Stack>
    </FormCard>
  )
}
