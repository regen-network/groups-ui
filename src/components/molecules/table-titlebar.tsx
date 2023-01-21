import type { ReactNode } from 'react'

import { Heading, HStack } from '@/atoms'

export const TableTitlebar = ({
  children,
  title,
  noBorder = false,
}: {
  children?: ReactNode
  title: string
  noBorder?: boolean
}) => {
  return (
    <HStack
      justify="space-between"
      px={8}
      py={5}
      borderBottomWidth={!noBorder ? 1 : undefined}
    >
      <Heading size="md">{title}</Heading>
      {children}
    </HStack>
  )
}
