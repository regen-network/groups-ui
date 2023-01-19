import type { ReactNode } from 'react'

import { Heading, Stack, Text } from '@/atoms/chakra-components'

/** Labeled text, vertically aligned */
export const ReviewItem = ({
  spacing = 2,
  ...props
}: {
  label: string
  spacing?: number
  children: ReactNode
}) => {
  return (
    <Stack spacing={spacing}>
      <Heading variant="label" size="xs">
        {props.label}
      </Heading>
      <Text>{props.children}</Text>
    </Stack>
  )
}
