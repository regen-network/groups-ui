import type { CSSProperties } from 'react'
import { styled } from '@mui/material'
import Box, { type BoxProps } from '@mui/material/Box'

interface FlexProps extends BoxProps {
  hFull?: boolean
  wFull?: boolean
  col?: boolean
}

const baseProps = ({ hFull, wFull, col }: FlexProps): CSSProperties => ({
  display: 'flex',
  ...(hFull && { height: '100%' }),
  ...(wFull && { width: '100%' }),
  ...(col && { flexDirection: 'column' }),
})

export const Flex = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'fill' && prop !== 'col',
})<FlexProps>((props) => ({
  ...baseProps(props),
}))

export const FlexEnd = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'fill' && prop !== 'col',
})<FlexProps>((props) => ({
  ...baseProps(props),
  justifyContent: 'flex-end',
}))

export const FlexBetween = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'fill' && prop !== 'col',
})<FlexProps>((props) => ({
  ...baseProps(props),
  justifyContent: 'space-between',
}))

export const Center = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'fill' && prop !== 'col',
})<FlexProps>((props) => ({
  ...baseProps(props),
  justifyContent: 'center',
  alignItems: 'center',
}))
