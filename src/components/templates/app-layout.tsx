import { Suspense, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

import { useColorModeValue } from 'hooks/chakra'

import { AnimatePresence, PopUpFade } from '@/animations'
import { Box, Flex } from '@/atoms'
import { Loading } from '@/molecules'
import { Navbar } from '@/organisms/navbar'

// Need to freeze outlet in order for route transition animations to work for
// context see: https://github.com/remix-run/react-router/discussions/8008
function FrozenOutlet() {
  const o = useOutlet()
  const [outlet] = useState(o)
  return <Suspense fallback={<Loading />}>{outlet}</Suspense>
}

export const AppLayout = () => {
  const { pathname } = useLocation()
  return (
    <Flex
      flexDir="column"
      maxH="100vh"
      maxW="100vw"
      height="full"
      overflowY="auto"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Navbar />
      <Box as="main" h="full">
        <AnimatePresence mode="wait">
          <PopUpFade key={pathname}>
            <FrozenOutlet />
          </PopUpFade>
        </AnimatePresence>
      </Box>
    </Flex>
  )
}
