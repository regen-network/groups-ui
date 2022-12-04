import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import type { ProposalStakeType } from 'types'
import { SPACING } from 'util/style.constants'

import { FormControl, FormLabel, Heading, RadioGroup, Stack } from '@/atoms'
import { FormCard, RadioGroupOptions } from '@/molecules'
import { SelectField } from '@/molecules/form-fields'

const stakeOptions: { label: string; value: ProposalStakeType }[] = [
  { label: 'Delegate', value: 'delegate' },
  { label: 'Redelegate', value: 'redelegate' },
  { label: 'Undelegate', value: 'undelegate' },
  { label: 'Claim reward', value: 'claim' },
]

export const ProposalStakeForm = () => {
  const [stakeType, setStakeType] = useState<ProposalStakeType>('delegate')
  return (
    <FormCard title="Stake">
      {/* <FormProvider {...form}> */}
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
        <DelegateForm />
      </Stack>
      {/* </FormProvider> */}
    </FormCard>
  )
}

const stubValidators = [
  { label: 'Validator 1', value: 'validator1' },
  { label: 'Validator 2', value: 'validator2' },
  { label: 'Validator 3', value: 'validator3' },
]

const DelegateForm = () => {
  const form = useForm()
  return (
    <FormProvider {...form}>
      <SelectField
        required
        name="validator"
        label="Validator"
        dropdownLabel="Select a validator"
        items={stubValidators}
      />
      <FormControl>
        <FormLabel>Transaction Fee</FormLabel>
        <Heading variant="label" size="xs">
          -REGEN TODO
        </Heading>
      </FormControl>
    </FormProvider>
  )
}
