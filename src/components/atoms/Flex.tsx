import type { CSSProperties } from 'react'
import { styled } from '@mui/material'
import Box from '@mui/material/Box'

const base: CSSProperties = {
  display: 'flex',
  width: '100%',
  height: '100%',
}

export const Flex = styled(Box)({
  ...base,
})

export const FlexEnd = styled(Box)({
  ...base,
  justifyContent: 'flex-end',
})

export const FlexBetween = styled(Box)({
  ...base,
  justifyContent: 'space-between',
})

export const FlexCol = styled(Box)({
  ...base,
  flexDirection: 'column',
})

export const Center = styled(Box)({
  ...base,
  justifyContent: 'center',
  alignItems: 'center',
})
