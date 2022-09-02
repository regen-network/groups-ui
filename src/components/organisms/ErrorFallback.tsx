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
      <Center width="full">
        <Code p={2} width="full">
          {error.message}
        </Code>
      </Center>
    </AlertTemplate>
  )
}
