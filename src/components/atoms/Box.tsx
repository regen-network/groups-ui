import { styled } from '@mui/material'
import MuiBox from '@mui/material/Box'

export const Box = MuiBox

export const Flex = styled(Box)({
  display: 'flex',
  width: '100%',
  height: '100%',
})

export const Center = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
})
