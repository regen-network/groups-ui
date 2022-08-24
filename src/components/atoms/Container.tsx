import { styled } from '@mui/material'
import MuiContainer from '@mui/material/Container'

export const Container = styled(MuiContainer)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
})

Container.defaultProps = {
  maxWidth: 'xl',
}
