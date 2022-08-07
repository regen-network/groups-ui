import { useState } from 'react'
import { AppBar, Toolbar } from '@mui/material'

import { CHAIN_LIST } from 'stubs/chains'

import { Box, Container, GroupsIcon, IconButton, Link, Text } from '@/atoms'
import { ChainMenu } from '@/molecules'

export const Navbar = () => {
  const [chain, setChain] = useState(CHAIN_LIST[0])
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: 2, borderColor: 'grey.200', bgcolor: 'white' }}
    >
      <Container>
        <Toolbar sx={{ my: 2 }} disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            component={Link}
            to="/"
          >
            <GroupsIcon />
          </IconButton>
          <Text variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Groups UI
          </Text>
          {/* TODO delete this - temp nav */}
          <Box component="ul" sx={{ display: 'flex', gap: 2, mr: 5, listStyle: 'none' }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="groups">Groups</Link>
            </li>
            <li>
              <Link to="groups/new">Create Group</Link>
            </li>
          </Box>
          <Box sx={{ flexGrow: 1, maxWidth: 300 }}>
            <ChainMenu chains={CHAIN_LIST} activeChain={chain} setChain={setChain} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
