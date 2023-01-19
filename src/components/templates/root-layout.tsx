import { Suspense, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

import { useColorModeValue } from 'hooks/chakra'

import { AnimatePresence, PopUpFade } from '@/animations'
import { Flex } from '@/atoms/chakra-components'
import { Loading } from '@/molecules/loading'
import { Navbar } from '@/organisms/navbar'

// Need to freeze outlet in order for route transition animations to work for
// context see: https://github.com/remix-run/react-router/discussions/8008
function FrozenOutlet() {
  const o = useOutlet()
  const [outlet] = useState(o)
  return <Suspense fallback={<Loading />}>{outlet}</Suspense>
}

export const RootLayout = () => {
  const { pathname } = useLocation()
  return (
    <Flex
      flexDir="column"
      maxH="100vh"
      maxW="100vw"
      height="full"
      overflowY="hidden"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Navbar />
      <Flex as="main" h="full" overflowY="auto" direction="column">
        <AnimatePresence mode="wait">
          <PopUpFade
            key={pathname}
            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            <FrozenOutlet />
          </PopUpFade>
        </AnimatePresence>
      </Flex>
    </Flex>
  )
}
