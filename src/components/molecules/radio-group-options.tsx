import type { ReactNode } from 'react'

import { useColorModeValue } from 'hooks/chakra-hooks'

import { AnimatePresence, motion } from '@/animations'
import {
  type RadioProps,
  type StackProps,
  Box,
  Collapse,
  RadioBox,
  Text,
  VStack,
} from '@/atoms'

export type RadioGroupOption = {
  label: string
  description?: string
  value: RadioProps['value']
  children?: ReactNode
}

/** can optionally be pasesed a `children` element which will be passed to the selected option */
export const RadioGroupOptions = ({
  options,
  selected,
  size,
  spacing,
}: {
  options: RadioGroupOption[]
  selected: string
  size?: RadioProps['size']
  spacing?: StackProps['spacing']
}) => {
  const inputBg = useColorModeValue('gray.50', 'gray.800')
  const inputBgFocused = useColorModeValue('white', 'gray.900')
  return (
    <VStack spacing={spacing}>
      {options.map(({ value, description, label, children }, i) => {
        const isSelected = selected === value
        return (
          <RadioBox
            key={label + i}
            selected={isSelected}
            value={value}
            label={label}
            size={size}
            rootProps={{
              __css: {
                '* > input': {
                  bg: inputBg,
                  '&:focus': {
                    bg: inputBgFocused,
                  },
                },
              },
            }}
          >
            {(!!description || !!children) && (
              <Box pt={2} pl={size === 'lg' ? 7 : 6}>
                {description && <Text>{description}</Text>}
                <Collapse in={isSelected} animateOpacity style={{ overflow: 'visible' }}>
                  <AnimatePresence>
                    {isSelected && !!children ? (
                      <motion.div key={'box-child-' + label + i}>
                        <Box pt={3} pb={2}>
                          {children}
                        </Box>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </Collapse>
              </Box>
            )}
          </RadioBox>
        )
      })}
    </VStack>
  )
}
