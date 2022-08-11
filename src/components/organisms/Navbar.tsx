import { useNavigate } from 'react-router-dom'
// import { allChainsArray } from 'chains'
import { useSnapshot } from 'valtio'

// import { setActiveChain, walletStore } from 'store'
import { setActiveChain } from 'store'
import { walletStore } from 'store/wallet.store'

import {
  AppBar,
  Box,
  Container,
  GroupsIcon,
  IconButton,
  Link,
  Text,
  Toolbar,
} from '@/atoms'
import { SelectDropdown } from '@/molecules'
import { CHAIN_LIST } from 'stubs/chains'

const CHAIN_ITEMS = CHAIN_LIST.map(({ chainId, chainName }) => ({
  value: chainId,
  name: chainName,
}))

export const Navbar = () => {
  // see: https://github.com/pmndrs/eslint-plugin-valtio/issues/32
  // could change to `export function` to fix, but should be able to update soon
  // eslint-disable-next-line
  const snap = useSnapshot(walletStore)
  const navigate = useNavigate()

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: 2,
        borderColor: 'divider',
      }}
    >
      <Container>
        <Toolbar sx={{ my: 2 }} disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/')}
          >
            <GroupsIcon />
          </IconButton>
          <Text variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Groups UI
          </Text>
          {/* TODO delete this */}
          <TempNav />
          <Box sx={{ flexGrow: 1, maxWidth: 300 }}>
            <SelectDropdown
              label="Select a Chain"
              value={snap.activeChain.chainId}
              onChange={setActiveChain}
              items={CHAIN_ITEMS}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

const TempNav = () => (
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
)
