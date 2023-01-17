import { useEffect } from 'react'
import { atom, useAtom, useSetAtom } from 'jotai'

import { useColorModeValue } from 'hooks/chakra'

import { Box, Button, Container, HStack, IconButton } from '@/atoms'

import { IoMdArrowBack, IoMdArrowForward } from 'assets/tsx'

export type FormFooterStateType = {
  btnText?: string
  onSubmit?: () => void
  onPrev?: () => void
  onNext?: () => void
}

export const FormFooterState = atom<FormFooterStateType>({})

export function useFormFooter({
  btnText,
  onPrev,
  onNext,
  onSubmit,
}: FormFooterStateType) {
  const setFooterActions = useSetAtom(FormFooterState)
  useEffect(() => {
    setFooterActions({ btnText, onPrev, onNext, onSubmit })
    return () => setFooterActions({})
  }, [btnText, onPrev, onNext, onSubmit, setFooterActions])
}

export const FormFooter = ({ isSubmitting }: { isSubmitting?: boolean }) => {
  const [{ onSubmit, onNext, onPrev, btnText }, setFooterActions] =
    useAtom(FormFooterState)
  const hasNavButtons = Boolean(onPrev || onNext)
  const bg = useColorModeValue('white', 'gray.800')
  const borderTopColor = useColorModeValue('gray.200', 'gray.700')

  // wipe state if footer removed from DOM
  useEffect(() => {
    return () => setFooterActions({})
  }, [setFooterActions])

  if (!onSubmit) return null
  return (
    <Box
      bg={bg}
      py={4}
      position="sticky"
      bottom={0}
      left={0}
      right={0}
      borderTopWidth={2}
      borderTopColor={borderTopColor}
      zIndex={10}
    >
      <Container maxW="container.xl">
        <HStack my={2} justify={hasNavButtons ? 'space-between' : 'flex-end'}>
          {hasNavButtons && (
            <HStack gap={1}>
              {!!onPrev && (
                <IconButton
                  size="lg"
                  aria-label="Go back"
                  variant="outline"
                  disabled={isSubmitting}
                  icon={<IoMdArrowBack />}
                  onClick={onPrev}
                />
              )}
              {!!onNext && (
                <IconButton
                  size="lg"
                  aria-label="Go Forward"
                  variant="outline"
                  disabled={isSubmitting}
                  icon={<IoMdArrowForward />}
                  onClick={onNext}
                />
              )}
            </HStack>
          )}
          <Button
            aria-label="Submit"
            size="lg"
            isLoading={isSubmitting}
            onClick={(e) => {
              e.preventDefault()
              onSubmit()
            }}
          >
            {btnText || 'Submit'}
          </Button>
        </HStack>
      </Container>
    </Box>
  )
}
