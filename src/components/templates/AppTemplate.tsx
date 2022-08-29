import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Box, Flex, useColorModeValue } from '@/atoms'
import { Spinner } from '@/molecules'
import { Navbar } from '@/organisms/Navbar'

export const AppTemplate = () => {
  return (
    <Flex flexDir="column" maxH="100vh" height="full" overflowY="auto">
      <Navbar />
      <Box as="main" h="full" bg={useColorModeValue('gray.50', 'gray.800')}>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </Box>
    </Flex>
  )
}
