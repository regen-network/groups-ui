import { ReactNode } from 'react'

import {
  Alert,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Box,
  Button,
  Center,
  Container,
} from '@/atoms'

import { GroupsIcon } from 'assets/tsx'

export const AlertTemplate = ({
  btnText,
  children,
  onBtnClick,
  status = 'error',
  text,
  title = 'Whoops!',
}: {
  btnText: string
  children?: ReactNode
  onBtnClick: () => void
  status?: AlertProps['status']
  text: string
  title?: string
}) => {
  return (
    <Container maxWidth="md">
      <Box borderWidth={1} borderRadius="lg" sx={{ mt: 5, py: 2, px: 4 }}>
        <Center>
          <GroupsIcon sx={{ height: 50, width: 50 }} />
        </Center>
        <Alert sx={{ my: 2 }} status={status}>
          <AlertIcon />
          <AlertTitle sx={{ fontWeight: 'bold' }}>{title}</AlertTitle>
          {text}
        </Alert>
        <Button size="small" color="inherit" onClick={onBtnClick}>
          {btnText}
        </Button>
        {children}
      </Box>
    </Container>
  )
}
