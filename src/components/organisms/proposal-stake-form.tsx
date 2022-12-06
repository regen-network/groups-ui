import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSnapshot } from 'valtio'

import type { DelegateFormValues, ProposalStakeType } from 'types'
import { defaultDelegateFormValues } from 'util/form.constants'
import { SPACING } from 'util/style.constants'

import { Chain } from 'store'

import { FormControl, FormLabel, Heading, RadioGroup, Stack } from '@/atoms'
import { FormCard, RadioGroupOptions } from '@/molecules'
import { AmountField, SelectField } from '@/molecules/form-fields'

const stakeOptions: { label: string; value: ProposalStakeType }[] = [
  { label: 'Delegate', value: 'delegate' },
  { label: 'Redelegate', value: 'redelegate' },
  { label: 'Undelegate', value: 'undelegate' },
  { label: 'Claim reward', value: 'claim' },
]

export const ProposalStakeForm = () => {
  const [stakeType, setStakeType] = useState<ProposalStakeType>('delegate')

  function renderForm() {
    switch (stakeType) {
      case 'claim':
        return <ClaimForm maxAmount="100" fee="0.75" denom="atom" />
      case 'redelegate':
      case 'delegate':
      case 'undelegate':
      default:
        return (
          <DelegateForm
            maxAmount="1000"
            denom="regen"
            fee="1.23"
            defaultValues={defaultDelegateFormValues}
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

const DelegateForm = (props: {
  maxAmount: string
  fee: string
  denom: string
  defaultValues: DelegateFormValues
}) => {
  const form = useForm({ defaultValues: props.defaultValues })
  const { validators } = useSnapshot(Chain)
  const items = validators.map((v, i) => {
    return {
      label: v.description?.moniker || `Validator ${i}`,
      value: v.operator_address || '',
    }
  })
  return (
    <FormProvider {...form}>
      <SelectField
        required
        name="validator"
        label="Validator"
        dropdownLabel="Select a validator"
        items={items}
      />
      <AmountField
        required
        name="amount"
        label="Amount"
        maxValue={props.maxAmount}
        denom={props.denom}
      />
      <FormControl>
        <FormLabel>Transaction Fee</FormLabel>
        <Heading variant="label" size="xs">
          {props.fee} {props.denom}
        </Heading>
      </FormControl>
    </FormProvider>
  )
}
const ClaimForm = (props: { maxAmount: string; fee: string; denom: string }) => {
  const form = useForm()
  return (
    <FormProvider {...form}>
      <AmountField
        required
        name="amount"
        label="Amount"
        maxValue={props.maxAmount}
        denom={props.denom}
      />
      <FormControl>
        <FormLabel>Transaction Fee</FormLabel>
        <Heading variant="label" size="xs">
          {props.fee} {props.denom}
        </Heading>
      </FormControl>
    </FormProvider>
  )
}
