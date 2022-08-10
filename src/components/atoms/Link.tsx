import { Link as RouteLink } from 'react-router-dom'
import MuiLink, { type LinkProps as MuiLinkProps } from '@mui/material/Link'

interface LinkProps extends MuiLinkProps {
  to: string
}

/** @returns an MUI Link for external, React-router for internal links */
export const Link = ({ to, ...props }: LinkProps) => {
  const isExternalLink = to.startsWith('htt') || to.startsWith('www')
  return (
    <MuiLink
      {...props}
      to={!isExternalLink ? to : ''}
      href={isExternalLink ? to : undefined}
      target={props.target || isExternalLink ? '_blank' : '_self'}
      component={isExternalLink ? 'a' : RouteLink}
    />
  )
}
Link.muiName = 'Link'
Link.displayName = 'Link'
