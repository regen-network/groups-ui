import { Alert, AlertDescription, AlertIcon, type AlertProps, AlertTitle } from '@/atoms'

export const Notify = (p: AlertProps) => {
  return (
    <Alert
      variant={p.variant || 'left-accent'}
      status={p.status || 'info'}
      borderRadius="sm"
    >
      <AlertIcon />
      <AlertTitle sx={{ fontWeight: 'bold' }}>{p.title}</AlertTitle>
      <AlertDescription>{p.children}</AlertDescription>
    </Alert>
  )
}
