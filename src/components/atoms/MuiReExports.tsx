// re-export of MUI components to aggregate
import MuiAlert from '@mui/material/Alert'
import MuiAlertTitle from '@mui/material/AlertTitle'
import MuiAppBar from '@mui/material/AppBar'
import MuiButton from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import MuiCardContent from '@mui/material/CardContent'
import MuiCircularProgress from '@mui/material/CircularProgress'
import MuiFormControl from '@mui/material/FormControl'
import MuiIconButton from '@mui/material/IconButton'
import MuiInputLabel from '@mui/material/InputLabel'
import MuiMenuItem from '@mui/material/MenuItem'
import MuiPaper from '@mui/material/Paper'
import MuiTextField from '@mui/material/TextField'
import MuiToolbar from '@mui/material/Toolbar'
import MuiTypography from '@mui/material/Typography'

// TODO: the following syntax isn't ideal and might interfere with code
// splitting, but proper syntax, IE:
//      `export { default as Button } from '@mui/material/Button'`
// doesn't work with intellisense... leaving like this for now but should check
// bundle size on build to make sure splitting is working
export { MuiTypography as Text } // shorter naming
export const Alert = MuiAlert
export const AlertTitle = MuiAlertTitle
export const AppBar = MuiAppBar
export const Button = MuiButton
export const Card = MuiCard
export const CardContent = MuiCardContent
export const CircularProgress = MuiCircularProgress
export const FormControl = MuiFormControl
export const IconButton = MuiIconButton
export const InputLabel = MuiInputLabel
export const MenuItem = MuiMenuItem
export const Paper = MuiPaper
export const TextField = MuiTextField
export const Toolbar = MuiToolbar

export type { AlertProps, SelectChangeEvent } from '@mui/material'
