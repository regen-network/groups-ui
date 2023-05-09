import { Link as RouteLink, type LinkProps as RouteLinkProps } from 'react-router-dom'
import { Link as ChakraLink, type LinkProps as ChakraLinkProps } from '@chakra-ui/react'

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
