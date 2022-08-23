import { type LinkProps as RouterLinkProps, Link as RouterLink } from 'react-router-dom'
import Link, { type LinkProps } from '@mui/material/Link'

export const RouteLink = (props: LinkProps & RouterLinkProps) => {
  return <Link component={RouterLink} {...props} />
}
