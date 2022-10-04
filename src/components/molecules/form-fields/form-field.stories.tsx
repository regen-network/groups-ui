import { FormProvider, useForm } from 'react-hook-form'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SPACING } from 'util/style.constants'

import { /* Box, */ Center, FormCard, Stack } from '@/atoms'

import { InputField } from './input-field'
import { NumberField } from './number-field'
import { RadioGroupField } from './radio-group-field'
// import { RadioGroupInputField } from './radio-group-input-field'
import { TextareaField } from './textarea-field'

export default {
  title: 'Molecules/Form fields',
  component: FormProvider,
  argTypes: {},
} as ComponentMeta<typeof FormProvider>

const Template: ComponentStory<typeof FormProvider> = (args) => {
  const form = useForm()
  return (
    <Center>
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
              options={[
                { label: 'label selected', value: '1' },
                { label: 'label 2', value: '2' },
              ]}
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
          </Stack>
        </FormProvider>
      </FormCard>
    </Center>
  )
}

export const Component = Template.bind({})
Component.args = {}
