import { FormProvider, useForm } from 'react-hook-form'
import type { Meta, StoryFn } from '@storybook/react'

import { Button, Center, Grid, GridItem, Input, Text } from '@/atoms'

import { Form } from '../form'
import { FormCard } from '../form-card'
import { RadioGroupOption } from '../radio-group-options'

import { AmountField } from './amount-field'
import { DenomField } from './denom-field'
import { InputField } from './input-field'
import { NumberField, NumberFieldWithSideLabel } from './number-field'
import { RadioGroupField } from './radio-group-field'
import { SelectField } from './select-field'
import { TextareaField } from './textarea-field'

export default {
  title: 'Molecules/Form fields',
  component: FormProvider,
  argTypes: {},
} as Meta<typeof FormProvider>

const options = [
  { label: 'label 1', value: '1' },
  { label: 'label 2', value: '2' },
  { label: 'label 3', value: '3' },
]

const optionsWithInput: RadioGroupOption[] = [
  { label: 'label 1', value: '1', description: 'description 1', children: <Input /> },
  { label: 'label 2', value: '2', description: 'description 2', children: <Input /> },
  { label: 'label 3', value: '3', description: 'description 3', children: <Input /> },
]

const Template: StoryFn<typeof FormProvider> = () => {
  const form = useForm()
  return (
    <Center flexDir="column">
      <Text mb={4}>(Fields to be used within react-hook-form)</Text>
      <FormCard>
        <Form form={form} onSubmit={(vals) => console.info('values: ', vals)}>
          <InputField name="input" label="Input field" required />
          <NumberField name="number" label="Number field" />
          <NumberFieldWithSideLabel
            name="number"
            label="Number field with Side Label"
            sideLabel="Side label"
          />
          <Grid gridTemplateColumns={'1fr 150px'}>
            <GridItem>
              <AmountField name="amount" label="Amount field" maxValue="100" />
            </GridItem>
            <GridItem>
              <DenomField
                name="denom"
                denoms={['regen', 'stake', 'chora']}
                maxValue="100"
              />
            </GridItem>
          </Grid>
          <TextareaField name="textarea" label="Textarea field" />
          <RadioGroupField name="radiogroup" label="Radiogroup field" options={options} />
          <RadioGroupField
            name="Radio Group with inputs"
            label="Radiogroup field with children passed"
            options={optionsWithInput}
          />
          <SelectField
            name="select"
            label="Select Field"
            dropdownLabel="pick an option"
            items={options}
          />
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </FormCard>
    </Center>
  )
}

export const Fields = Template.bind({})
Fields.args = {}
