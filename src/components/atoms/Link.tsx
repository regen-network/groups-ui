// import { forwardRef } from 'react'
import { type LinkProps as RouteLinkProps, Link as RouteLink } from 'react-router-dom'
import { type LinkProps as ChakraLinkProps, Link as ChakraLink } from '@chakra-ui/react'

// interface LinkProps extends MuiLinkProps {
//   to: string
// }

export const Link = (props: ChakraLinkProps & RouteLinkProps) => {
  return <ChakraLink as={props.to ? RouteLink : ChakraLink} {...props} />
}

/** @returns an MUI Link for external, React-router for internal links */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const Link = forwardRef(({ to, ...props }: ChakraLinkProps, ref: any) => {
//   const isExternalLink = to.startsWith('htt') || to.startsWith('www')
//   return (
//     <ChakraLink
//       {...props}
//       ref={ref}
//       to={!isExternalLink ? to : ''}
//       href={isExternalLink ? to : undefined}
//       target={props.target || isExternalLink ? '_blank' : '_self'}
//       component={isExternalLink ? 'a' : RouteLink}
//     />
//   )
// })
// Link.displayName = 'Link'
