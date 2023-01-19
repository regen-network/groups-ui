import { useEffect, useRef } from 'react'
import { atom, useAtom, useSetAtom } from 'jotai'

import { useColorModeValue } from 'hooks/chakra-hooks'

import { Box, Button, Container, HStack, IconButton } from '@/atoms/chakra-components'

import { IoMdArrowBack, IoMdArrowForward } from 'assets/tsx'

type FormFooterState = {
  btnText?: string
  submitRef?: React.RefObject<HTMLButtonElement>
  onPrev?: () => void
  onNext?: () => void
}

export const FormFooterAtom = atom<FormFooterState>({})

/** In order for the `formFooter` submit handler to work properly, this must be
 * placed within the `<form>` element it's supposed to trigger. It won't
 * actually appear in the dom, just forwards the submit behavior Note:
 * `FormFooter` does not need to be a child of the `form` it triggers, ie this
 * is fine:
 * @example
 * ```tsx
 * <FormFooter />
 * <form onSubmit={mySubmitFunc}>
 *   <FormSubmitHiddenButton />
 * </form>
 * ``` */
export const FormSubmitHiddenButton = ({ btnText, onPrev, onNext }: FormFooterState) => {
  const setFooterActions = useSetAtom(FormFooterAtom)
  const submitRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    setFooterActions({ btnText, onPrev, onNext, submitRef })
    return () => setFooterActions({})
  }, [btnText, onPrev, onNext, setFooterActions])
  return <Button hidden type="submit" ref={submitRef} />
}

export const FormFooter = ({ isSubmitting }: { isSubmitting?: boolean }) => {
  const [{ onNext, onPrev, btnText, submitRef }, setFooterActions] =
    useAtom(FormFooterAtom)
  const hasNavButtons = Boolean(onPrev || onNext)
  const bg = useColorModeValue('white', 'gray.800')
  const borderTopColor = useColorModeValue('gray.200', 'gray.700')
  const shadow = useColorModeValue('md', 'dark-lg')

  // wipe state if footer removed from DOM
  useEffect(() => {
    return () => setFooterActions({})
  }, [setFooterActions])

  if (!submitRef) return null
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
      shadow={shadow}
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
              // NOTE: For this to work, there needs to be a
              submitRef.current?.click()
            }}
          >
            {btnText || 'Submit'}
          </Button>
        </HStack>
      </Container>
    </Box>
  )
}
