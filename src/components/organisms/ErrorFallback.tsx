import { Center, Code } from '@/atoms'
import { AlertTemplate } from '@/templates/AlertTemplate'

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
      <Center>
        <Code>{error.message}</Code>
      </Center>
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
