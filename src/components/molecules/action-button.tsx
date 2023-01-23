import type { IconType } from 'react-icons'

import { useColorModeValue } from 'hooks/chakra-hooks'

import { BaseCard, Box, CardBody, Flex, InfoTooltip, Text } from '@/atoms'

export const ActionButton = (props: {
  label: string
  /** NOTE: This will have to change if we want the component to be more flexible
   * in the future - this is easiest for now */
  icon: IconType
  tooltipText?: string
  onClick: () => void
}) => {
  const { icon: Icon } = props
  const colors = {
    bg: useColorModeValue('blue.200', 'blue.800'),
    outline: useColorModeValue('blue.400', 'blue.700'),
    svg: useColorModeValue('blue.600', 'blue.500'),
  }
  return (
    <BaseCard
      direction={{ base: 'column', sm: 'row' }}
      as={'button'}
      onClick={props.onClick}
      w="full"
      alignItems="center"
      transition={'all 0.2s ease-in-out'}
      borderColor="blackAlpha.300"
      borderLeftRadius="lg"
      borderWidth={1}
      _hover={{
        transform: 'scale(1.005)',
        boxShadow: 'lg',
        borderColor: colors.outline,
      }}
    >
      <Box
        bg={colors.bg}
        borderLeftRadius="md"
        borderWidth={1}
        borderColor={colors.outline}
      >
        <CardBody color={colors.svg} p={4}>
          <Icon fontSize={'33px'} />
        </CardBody>
      </Box>
      <CardBody h="full">
        <Flex justify="space-between" align="center" h="full">
          <Text size="xl">{props.label}</Text>
          {props.tooltipText && <InfoTooltip label={props.tooltipText} />}
        </Flex>
      </CardBody>
    </BaseCard>
  )
}
