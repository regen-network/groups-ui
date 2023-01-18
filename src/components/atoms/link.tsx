import { type LinkProps as RouteLinkProps, Link as RouteLink } from 'react-router-dom'
import { type LinkProps as ChakraLinkProps, Link as ChakraLink } from '@chakra-ui/react'

function isRouteLinkProps(
  props: ChakraLinkProps | RouteLinkProps,
): props is RouteLinkProps {
  return 'to' in props
}

export const Link = (props: ChakraLinkProps | RouteLinkProps) => {
  return isRouteLinkProps(props) ? (
    <ChakraLink as={RouteLink} {...props} />
  ) : (
    <ChakraLink {...props} />
  )
}
