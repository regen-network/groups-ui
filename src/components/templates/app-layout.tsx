import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { useColorModeValue } from 'hooks/chakra'

import { PopUpFade } from '@/animations'
import { Box, Flex } from '@/atoms'
import { Loading } from '@/molecules'
import { Navbar } from '@/organisms/navbar'

export const AppLayout = () => {
  return (
    <PopUpFade>
      <Flex flexDir="column" maxH="100vh" height="full" overflowY="auto">
        <Navbar />
        <Box as="main" h="full" bg={useColorModeValue('gray.50', 'gray.800')}>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </Box>
      </Flex>
    </PopUpFade>
  )
}
