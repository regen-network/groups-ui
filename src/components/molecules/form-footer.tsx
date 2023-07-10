import { useEffect, useRef } from 'react'
import { atom, useAtom, useSetAtom } from 'jotai'

import { useColorModeValue } from 'hooks/chakra-hooks'

import { AnimatePresence, FadeIn } from '@/animations'
import { Box, Button, Container, HStack, IconButton } from '@/atoms'
import { QuestionTooltip } from '@/atoms/question-tooltip'

import { BackIcon, ForwardIcon } from 'assets/tsx'

type FormFooterState = {
  btnText?: string
  submitRefs?: {
    [id: string]: React.RefObject<HTMLButtonElement>
  }
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
export const FormSubmitHiddenButton = ({
  id,
}: {
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (...args: any[]) => void
}) => {
  const setFooterActions = useSetAtom(FormFooterAtom)
  const submitRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    setFooterActions((state) => ({
      ...state,
      submitRefs: { ...state.submitRefs, [id]: submitRef },
    }))
    return () => {
      // remove ref from footer state on button unmount
      setFooterActions((state) => {
        const submitRefs = { ...state.submitRefs }
        delete submitRefs[id]
        return { ...state, submitRefs }
      })
    }
  }, [setFooterActions, id])
  return <Button hidden type="submit" ref={submitRef} />
}

export function useFormFooter({ btnText, onPrev, onNext }: FormFooterState): void {
  const setFooterActions = useSetAtom(FormFooterAtom)
  useEffect(() => {
    setFooterActions((prev) => ({ ...prev, btnText, onPrev, onNext }))
    return () => setFooterActions((prev) => ({ submitRefs: prev.submitRefs }))
  }, [btnText, onPrev, onNext, setFooterActions])
}

export const FormFooter = ({
  isSubmitting,
  tooltip,
}: {
  isSubmitting?: boolean
  tooltip?: string
}) => {
  const [{ onNext, onPrev, btnText, submitRefs }, setFooterActions] =
    useAtom(FormFooterAtom)
  const hasNavButtons = Boolean(onPrev || onNext)
  const bg = useColorModeValue('white', 'gray.800')
  const borderTopColor = useColorModeValue('gray.200', 'gray.700')
  const shadow = useColorModeValue('md', 'dark-lg')

  // wipe state if footer removed from DOM
  useEffect(() => {
    return () => setFooterActions({})
  }, [setFooterActions])

  function handleSubmitAll() {
    if (!submitRefs) return
    // loop through stored refs and click them all
    Object.values(submitRefs).forEach((ref) => ref.current?.click())
  }

  if (!submitRefs) return null
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
          <AnimatePresence mode="wait">
            <HStack gap={1}>
              {!!onPrev && (
                <FadeIn key="back-btn">
                  <IconButton
                    size="lg"
                    aria-label="Go back"
                    variant="outline"
                    disabled={isSubmitting}
                    icon={<BackIcon />}
                    onClick={onPrev}
                  />
                </FadeIn>
              )}
              {!!onNext && (
                <FadeIn key="forward-btn">
                  <IconButton
                    size="lg"
                    aria-label="Go Forward"
                    variant="outline"
                    disabled={isSubmitting}
                    icon={<ForwardIcon />}
                    onClick={onNext}
                  />
                </FadeIn>
              )}
            </HStack>
          </AnimatePresence>
          <Box>
            {tooltip && (
              <Box mr={5} display="inline">
                <QuestionTooltip label={tooltip} />
              </Box>
            )}
            <Button
              aria-label="Submit"
              size="lg"
              isLoading={isSubmitting}
              minW="60"
              onClick={(e) => {
                e.preventDefault()
                handleSubmitAll()
              }}
            >
              {btnText || 'Submit'}
            </Button>
          </Box>
        </HStack>
      </Container>
    </Box>
  )
}
