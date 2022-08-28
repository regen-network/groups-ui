import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Box, Stack } from '@/atoms'
import { Spinner } from '@/molecules'
import { Navbar } from '@/organisms/Navbar'

export const AppTemplate = () => {
  return (
    <Stack sx={{ maxHeight: '100vh', height: '100%', overflowY: 'auto' }}>
      <Navbar />
      <Box component="main" sx={{ height: '100%' }}>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </Box>
    </Stack>
  )
}
