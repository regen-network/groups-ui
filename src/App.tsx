import { CssBaseline } from '@mui/material'

import { Box, Button, Center } from '@/atoms'
import { Navbar } from '@/organisms'

function App() {
  return (
    <Box>
      <CssBaseline />
      <Navbar />
      <Center>
        <Button variant="contained">Ping</Button>
      </Center>
    </Box>
  )
}

export default App
