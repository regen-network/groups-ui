import { ReactNode } from 'react'

import { SPACING } from 'util/style.constants'

import { useColorModeValue } from 'hooks/chakra'

import { Card, CardBody, CardHeader, Text } from '../atoms/chakra'

export const FormCard = ({
  title,
  children,
}: {
  children: ReactNode
  title?: string
}) => {
  const titleBg = useColorModeValue('gray.200', 'gray.700')
  const bg = useColorModeValue('white', 'gray.800')
  return (
    <Card w={['100%', SPACING.formWidth]} variant="outline" borderRadius="lg" bg={bg}>
      {title && (
        <CardHeader bg={titleBg}>
          <Text fontWeight="bold">{title}</Text>
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
    </Card>
  )
}
