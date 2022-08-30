import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Box, Flex, useColorModeValue } from '@/atoms'
import { Loading } from '@/molecules'
import { Navbar } from '@/organisms/Navbar'

export const AppTemplate = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.995, y: 10, height: '95%' }}
      animate={{ opacity: 1, scale: 1, y: 0, height: '100%' }}
      exit={{ opacity: 0, scale: 0.995, y: -10, height: '95%' }}
      transition={{ duration: 0.2 }}
    >
      <Flex flexDir="column" maxH="100vh" height="full" overflowY="auto">
        <Navbar />
        <Box as="main" h="full" bg={useColorModeValue('gray.50', 'gray.800')}>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </Box>
      </Flex>
    </motion.div>
  )
}
