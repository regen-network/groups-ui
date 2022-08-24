import { Card, CardContent } from '@/atoms'

export const FormCard = (p: { children: React.ReactNode }) => (
  <Card sx={{ width: ['100%', 560] }} elevation={2}>
    <CardContent>{p.children}</CardContent>
  </Card>
)
