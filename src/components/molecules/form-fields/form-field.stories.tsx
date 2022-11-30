import { FormProvider, useForm } from 'react-hook-form'
import { Meta, StoryFn } from '@storybook/react'

import { SPACING } from 'util/style.constants'

import { /* Box, */ Button, Center, Stack, Text } from '@/atoms'

import { FormCard } from '../form-card'

import { InputField } from './input-field'
import { NumberField } from './number-field'
import { RadioGroupField } from './radio-group-field'
import { SelectField } from './select-field'
// import { RadioGroupInputField } from './radio-group-input-field'
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

const Template: StoryFn<typeof FormProvider> = (args) => {
  const form = useForm()
  return (
    <Center flexDir="column">
      <Text mb={4}>(Fields to be used within react-hook-form)</Text>
      <FormCard>
        <FormProvider {...form} {...args}>
          <Stack spacing={SPACING.formStack}>
            <InputField name="input" label="Input field" required />
            <InputField name="input2" label="Input field" />
            <NumberField name="number" label="Number field" />
            <TextareaField name="textarea" label="Textarea field" />
            <RadioGroupField
              name="radiogroup"
              label="Radiogroup field"
              options={options}
            />
            <SelectField
              name="select"
              label="Select"
              dropdownLabel="pick an option"
              items={options}
            />
            {/* <RadioGroupInputField
              name="radiogroup2"
              label="Radiogroup field with children"
              options={[
                { label: 'label selected', value: '1', children: <Box>Hello</Box> },
                { label: 'label 2', value: '2', children: <Box>World</Box> },
              ]}
            /> */}
            {/* <RadioInputGroupField
              name="radiogroup3"
              label="Radiogroup field custom"
              options={[
                { label: 'label selected', value: '1' },
                { label: 'label 2', value: '2' },
              ]}
            /> */}
            <div>
              <Button
                onClick={form.handleSubmit((vals) => console.log('vield values: ', vals))}
              >
                Submit
              </Button>
            </div>
          </Stack>
        </FormProvider>
      </FormCard>
    </Center>
  )
}

export const Component = Template.bind({})
Component.args = {}
