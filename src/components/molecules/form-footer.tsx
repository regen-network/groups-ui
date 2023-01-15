import { useColorModeValue } from 'hooks/chakra'

import { type ButtonProps, Box, Button, Container, HStack, IconButton } from '@/atoms'

import { IoMdArrowBack, IoMdArrowForward } from 'assets/tsx'

export const FormFooter = ({
  onNext,
  onPrev,
  onBtnClick,
  btnText = 'Submit',
}: {
  btnText?: string
  onPrev?: () => void
  onNext?: () => void
  onBtnClick: ButtonProps['onClick']
}) => {
  const hasNavButtons = Boolean(onPrev || onNext)
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      py={4}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      borderTopWidth={2}
      borderTopColor={useColorModeValue('gray.200', 'gray.700')}
      // boxShadow={useColorModeValue('md', 'dark-lg')}
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
                  icon={<IoMdArrowBack />}
                  onClick={onPrev}
                />
              )}
              {!!onNext && (
                <IconButton
                  size="lg"
                  aria-label="Go Forward"
                  variant="outline"
                  icon={<IoMdArrowForward />}
                  onClick={onNext}
                />
              )}
            </HStack>
          )}
          <Button aria-label="Submit" size="lg" onClick={onBtnClick}>
            {btnText}
          </Button>
        </HStack>
      </Container>
    </Box>
  )
}
