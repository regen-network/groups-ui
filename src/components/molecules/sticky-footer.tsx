import { type ChakraProps, Box, Button, Container, Flex } from '@/atoms'

export const StickyFooter = ({
  btnText,
  onBtnClick,
  sx,
}: {
  btnText: string
  onBtnClick: () => void
  sx?: ChakraProps['sx']
}) => {
  return (
    <Box sx={{ position: 'sticky', bottom: 0, py: 3, ...sx }}>
      <Container>
        <Flex justify="end">
          <Button onClick={onBtnClick} size="large">
            {btnText}
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}
