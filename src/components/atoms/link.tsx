import { type LinkProps as RouteLinkProps, Link as RouteLink } from 'react-router-dom'
import { type LinkProps as ChakraLinkProps, Link as ChakraLink } from '@chakra-ui/react'

export const Link = (props: ChakraLinkProps & RouteLinkProps) => {
  return <ChakraLink as={props.to ? RouteLink : ChakraLink} {...props} />
}
