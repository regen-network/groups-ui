import type { Meta, StoryFn } from '@storybook/react'

import { useClipboard } from 'hooks/chakra'

import { Grid, GridItem, Heading, Stack, Text } from '@/atoms/chakra-components'

import * as ChakraIcons from './chakra-icons'
import { GroupsIcon } from './groups-icon'
import * as ReactIcons from './react-icons'

/** Import component and add here to display */
const customIcons = [GroupsIcon]
const reactIcons = [GroupsIcon, ...Object.values(ReactIcons)]
const chakraIcons = Object.values(ChakraIcons)

export default {
  title: 'Atoms/Icons',
  component: GroupsIcon,
  argTypes: {
    color: {
      options: ['primary', 'secondary'],
      control: 'radio',
    },
  },
} as Meta<typeof GroupsIcon>

const Template: StoryFn<typeof GroupsIcon> = () => {
  const { onCopy, value, setValue, hasCopied } = useClipboard('')
  return (
    <Stack spacing={8}>
      <Text textAlign="center" mb={4}>
        (Click to copy component)
      </Text>
      <Heading textAlign="center">React Icons</Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {reactIcons.map((Icon, i) => (
          <GridItem
            key={i}
            flexDir="column"
            display="flex"
            alignItems="center"
            gap={2}
            borderWidth={2}
            borderRadius={4}
            py={4}
            cursor="pointer"
            onPointerEnter={() => setValue(Icon.name)}
            onClick={() => {
              onCopy()
            }}
          >
            {hasCopied && value.includes(Icon.name) ? 'Copied!' : Icon.name}
            <Icon height={25} width={25} />
          </GridItem>
        ))}
      </Grid>

      <Heading textAlign="center">Chakra Icons</Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {chakraIcons.map((Icon, i) => (
          <GridItem
            key={i}
            flexDir="column"
            display="flex"
            alignItems="center"
            gap={2}
            borderWidth={2}
            borderRadius={4}
            py={4}
            cursor="pointer"
            onPointerEnter={() => setValue(Icon.displayName || '')}
            onClick={() => {
              onCopy()
            }}
          >
            {hasCopied && Icon.displayName && value.includes(Icon.displayName)
              ? 'Copied!'
              : Icon.displayName}
            <Icon h={25} w={25} />
          </GridItem>
        ))}
      </Grid>

      <Heading textAlign="center">Custom Icons</Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {customIcons.map((Icon, i) => (
          <GridItem
            key={i}
            flexDir="column"
            display="flex"
            alignItems="center"
            gap={2}
            borderWidth={2}
            borderRadius={4}
            py={4}
            cursor="pointer"
            onPointerEnter={() => setValue(Icon.name)}
            onClick={() => {
              onCopy()
            }}
          >
            {hasCopied && value.includes(Icon.name) ? 'Copied!' : Icon.name}
            <Icon h={25} w={25} />
          </GridItem>
        ))}
      </Grid>
    </Stack>
  )
}

export const Component = Template.bind({})
Component.args = {}
