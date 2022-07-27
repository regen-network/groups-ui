import { useState } from 'react'
import { AppBar, Toolbar } from '@mui/material'

import { CHAIN_LIST } from 'stubs/chains'

import { Box, GroupsIcon, IconButton, Text } from '@/atoms'
import { ChainMenu } from '@/molecules'

export const Navbar = () => {
  const [chain, setChain] = useState(CHAIN_LIST[0])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ py: 2 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <GroupsIcon />
          </IconButton>
          <Text variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Groups UI
          </Text>
          <Box sx={{ flexGrow: 1, maxWidth: 300 }}>
            <ChainMenu chains={CHAIN_LIST} activeChain={chain} setChain={setChain} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
