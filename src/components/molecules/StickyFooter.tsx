import { Button, Container, FlexEnd, Paper } from '@/atoms'

export const StickyFooter = (p: { btnText: string }) => {
  return (
    <Paper elevation={16} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, py: 4 }}>
      <Container>
        <FlexEnd>
          <Button size="large">{p.btnText}</Button>
        </FlexEnd>
      </Container>
    </Paper>
  )
}
