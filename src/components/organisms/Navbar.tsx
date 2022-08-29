import { useNavigate } from 'react-router-dom'

import { Box, Container, HStack, IconButton, Link, useColorModeValue } from '@/atoms'

import { ChainSelect } from './ChainSelect'

import { GroupsIcon } from 'assets/tsx'

export const Navbar = () => {
  const navigate = useNavigate()
  // const theme = useTheme()

  return (
    <Box bg={useColorModeValue('white', 'gray.800')} borderBottomWidth="2px" py={4}>
      <Container maxW="container.xl">
        <HStack sx={{ my: 2 }}>
          <IconButton
            size="large"
            // edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/')}
          >
            <GroupsIcon />
          </IconButton>
          {/* TODO delete this */}
          <TempNav />
          <Box sx={{ flexGrow: 1, maxWidth: [200, 300] }}>
            <ChainSelect />
          </Box>
        </HStack>
      </Container>
    </Box>
  )
}

const TempNav = () => (
  <Box as="ul" sx={{ flexGrow: 1, display: 'flex', gap: 2, mr: 5, listStyle: 'none' }}>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="groups">Groups</Link>
    </li>
  </Box>
)
