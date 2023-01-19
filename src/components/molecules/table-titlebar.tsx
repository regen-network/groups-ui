import type { ReactNode } from 'react'

import { Heading, HStack } from '@/atoms/chakra-components'

export const TableTitlebar = ({
  children,
  title,
}: {
  children?: ReactNode
  title: string
}) => {
  return (
    <HStack justify="space-between" px={8} py={5} borderBottomWidth={1}>
      <Heading size="md">{title}</Heading>
      {children}
    </HStack>
  )
}
