import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Box, Container, FlexCol } from '@/atoms'
import { Spinner } from '@/molecules'
import { Navbar } from '@/organisms'

export const AppLayout = () => {
  return (
    <FlexCol sx={{ maxHeight: '100vh', height: '100%', overflowY: 'auto' }}>
      <Navbar />
      <Box component="main" sx={{ height: '100%' }}>
        <Container>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </Container>
      </Box>
    </FlexCol>
  )
}
