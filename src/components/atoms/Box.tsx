import { styled } from '@mui/material'
import MuiBox from '@mui/material/Box'

export const Box = MuiBox

export const Flex = styled(MuiBox)({
  display: 'flex',
  width: '100%',
  height: '100%',
})

export const FlexCol = styled(MuiBox)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
})

export const Center = styled(MuiBox)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
})
