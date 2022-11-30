import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import type { ProposalStakeType } from 'types'
import { SPACING } from 'util/style.constants'

import { FormControl, FormLabel, Heading, RadioGroup, Stack } from '@/atoms'
import { FormCard, RadioGroupOptions } from '@/molecules'

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

const DelegateForm = () => {
  const form = useForm()
  return (
    <FormProvider {...form}>
      <FormControl>
        <FormLabel>Transaction Fee</FormLabel>
        <Heading variant="label" size="xs">
          -REGEN TODO
        </Heading>
      </FormControl>
    </FormProvider>
  )
}
