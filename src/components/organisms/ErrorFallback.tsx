import { Card, CardContent } from '@/atoms'
import { AlertTemplate } from '@/templates'

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) => {
  return (
    <AlertTemplate
      btnText="Reset"
      onBtnClick={resetErrorBoundary}
      title="Whoops!"
      text="There was a problem"
    >
      <Card>
        <CardContent>
          <pre>
            <code>{error.message}</code>
          </pre>
        </CardContent>
      </Card>
    </AlertTemplate>
    // <CenterCol>
    //   <Alert
    //     severity="error"
    //     action={<Button onClick={resetErrorBoundary}>Reset</Button>}
    //   >
    //     <AlertTitle>Whoops!</AlertTitle>
    //     There was a problem
    //   </Alert>
    //   <Paper
    //     variant="outlined"
    //     sx={{
    //       px: 4,
    //       py: 2,
    //       mt: 4,
    //     }}
    //   >
    //     <pre>
    //       <code>{error.message}</code>
    //     </pre>
    //   </Paper>
    // </CenterCol>
  )
}
