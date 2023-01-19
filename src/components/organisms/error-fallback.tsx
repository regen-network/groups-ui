import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

import { toErrorWithMessage } from 'util/errors'

import { Center, Code } from '@/atoms/chakra-components'
import { AlertTemplate } from '@/templates/alert-template'

function getErrorText(error: unknown): { text: string; message?: string } {
  if (isRouteErrorResponse(error)) {
    return {
      text: error.status + ' ' + error.statusText,
      message: error.data?.message,
    }
  }
  return {
    text: 'There was a problem',
    message: toErrorWithMessage(error).message,
  }
}

export const ErrorFallback = () => {
  const error = useRouteError()
  // TODO: `toErrorWithMessage` was added before react-router 6.4 upgrade -
  // there's probably a more graceful solution. See:
  // https://reactrouter.com/en/main/route/error-element
  // const error = toErrorWithMessage(routeErr)

  console.error(error) // eslint-disable-line no-console

  function handleReset() {
    window.location.reload()
  }

  const { text, message } = getErrorText(error)

  return (
    <AlertTemplate btnText="Reset" onBtnClick={handleReset} title="Oops!" text={text}>
      <Center width="full">
        <Code p={2} width="full">
          {message}
        </Code>
      </Center>
    </AlertTemplate>
  )
}
