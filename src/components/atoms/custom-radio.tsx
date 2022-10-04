// TODO: gettign waaay overcomplicated - maybe circle back if necessary
export {}
// import type { ReactNode } from 'react'

// import { useColorModeValue, useRadio } from 'hooks/chakra'

// import {
//   type RadioProps,
//   Box,
//   chakra,
//   Collapse,
//   Flex,
//   forwardRef,
//   Radio,
//   Text,
// } from './chakra'

// /** custom `Radio` element - accepts children and will collapse when not selected */
// export const CustomRadio = forwardRef<
//   RadioProps & {
//     label: string
//     children?: ReactNode
//   },
//   'div'
// >(({ children, label, ...radioProps }, ref) => {
//   const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
//     useRadio(radioProps)

//   const bgSelected = useColorModeValue('gray.100', 'gray.700')
//   const borderSelected = useColorModeValue('gray.400', 'gray.500')
//   const borderNormal = useColorModeValue('gray.300', 'gray.600')
//   return (
//     <chakra.label {...htmlProps} cursor="pointer">
//       <input {...getInputProps()} hidden />
//       <Flex
//         w="full"
//         borderRadius="md"
//         borderWidth={1}
//         borderColor={
//           state.isInvalid ? 'red' : state.isChecked ? borderSelected : borderNormal
//         }
//         shadow={state.isChecked ? 'md' : undefined}
//         bg={state.isChecked ? bgSelected : undefined}
//         transition="all 0.2s ease-in-out"
//         py={2.5}
//         px={3}
//       >
//         <Flex
//           alignItems="center"
//           justifyContent="center"
//           border="2px solid"
//           borderColor="green.500"
//           w={4}
//           h={4}
//           {...getCheckboxProps()}
//         >
//           {state.isChecked && <Box w={2} h={2} bg="green.500" />}
//         </Flex>
//         <Flex direction="column">
//           {/* <Radio size="md" isChecked={state.isChecked} w="full" ref={ref}> */}
//           <Text fontSize="large" fontWeight="semibold" {...getLabelProps()}>
//             {label}
//           </Text>
//           {/* </Radio> */}
//           <Collapse in={state.isChecked} animateOpacity>
//             {children}
//           </Collapse>
//         </Flex>
//       </Flex>
//     </chakra.label>
//   )
// })
