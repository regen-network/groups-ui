import { type SxProps, type Theme, Button, Container, FlexEnd, Paper } from '@/atoms'

export const StickyFooter = ({
  btnText,
  onBtnClick,
  sx = [],
}: {
  btnText: string
  onBtnClick: () => void
  sx?: SxProps<Theme>
}) => {
  return (
    <Paper
      elevation={16}
      sx={[{ position: 'sticky', bottom: 0, py: 3 }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Container>
        <FlexEnd>
          <Button onClick={onBtnClick} size="large">
            {btnText}
          </Button>
        </FlexEnd>
      </Container>
    </Paper>
  )
}
