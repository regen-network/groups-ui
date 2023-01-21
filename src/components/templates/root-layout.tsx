import { Suspense, useState } from 'react'
import { useOutlet } from 'react-router-dom'

import { useColorModeValue } from 'hooks/chakra-hooks'
import { useAppLocation } from 'hooks/react-router'

import { AnimatePresence, PopUpFade } from '@/animations'
import { Flex } from '@/atoms'
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
  const { pathname } = useAppLocation()
  return (
    <Flex
      flexDir="column"
      h="100vh"
      w="100vw"
      overflowY="hidden"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Navbar />
      <AnimatePresence mode="wait">
        <PopUpFade
          key={pathname}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            flexGrow: 1,
            overflowY: 'auto',
          }}
        >
          <FrozenOutlet />
        </PopUpFade>
      </AnimatePresence>
    </Flex>
  )
}
