import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Box, FlexCol } from '@/atoms'
import { Spinner } from '@/molecules'
import { Navbar } from '@/organisms'

export const AppTemplate = () => {
  return (
    <FlexCol sx={{ maxHeight: '100vh', height: '100%', overflowY: 'auto' }}>
      <Navbar />
      <Box component="main" sx={{ height: '100%' }}>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </Box>
    </FlexCol>
  )
}
