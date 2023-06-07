import type { ReactNode } from 'react'
import type { Meta, StoryFn } from '@storybook/react'

import { Center, HStack, NumberInput, Stack, Text } from '@/atoms'

export default {
  title: 'Atoms/inputs',
  component: Center,
  argTypes: {},
} as Meta<typeof Center>

const Label = ({ children, label }: { children: ReactNode; label: string }) => (
  <HStack>
    <Text>{label}</Text>
    {children}
  </HStack>
)

const Template: StoryFn<typeof Center> = () => {
  return (
    <Center flexDir="column">
      <Text mb={4}>(base inputs)</Text>
      <Stack>
        <Label label="NumberInput">
          <NumberInput />
        </Label>
      </Stack>
    </Center>
  )
}

export const Fields = Template.bind({})
Fields.args = {}
