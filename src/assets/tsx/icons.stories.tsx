import { Meta, StoryFn } from '@storybook/react'

import { useClipboard } from 'hooks/chakra'

import { Grid, GridItem, Heading, Stack, Text } from '@/atoms'

import { GroupsIcon } from './groups-icon'
import * as ReactIcons from './react-icons'

/** Import component and add here to display */
const icons = [GroupsIcon, ...Object.values(ReactIcons)]

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
    <Stack>
      <Heading textAlign="center">App Icons</Heading>
      <Text textAlign="center" mb={4}>
        (Click to copy component)
      </Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {icons.map((Icon, i) => (
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
            onPointerEnter={() => setValue(`<${Icon.name} />`)}
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
