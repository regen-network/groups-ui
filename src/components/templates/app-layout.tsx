import { ReactNode, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { useColorModeValue } from 'hooks/chakra'

import { PopUpFade } from '@/animations'
import { Box, Flex } from '@/atoms'
import { Loading } from '@/molecules'
import { Navbar } from '@/organisms/navbar'

export const AppLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <PopUpFade>
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
          <Suspense fallback={<Loading />}>
            <Outlet />
            {/* {children} */}
          </Suspense>
        </Box>
      </Flex>
    </PopUpFade>
  )
}
