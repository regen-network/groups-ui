import { ComponentProps } from 'react'
import {
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
  FormProvider,
  SubmitErrorHandler,
} from 'react-hook-form'

import { SPACING } from 'util/constants'

import { Stack } from '@/atoms'

interface Props<T extends FieldValues>
  extends Omit<ComponentProps<'form'>, 'onSubmit' | 'onError'> {
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
  onError?: SubmitErrorHandler<T>
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  onError,
  children,
  ...props
}: Props<T>) => {
  // const handleSubmit: typeof form['handleSubmit'] = () => {}
  return (
    <FormProvider {...form}>
      <form {...props} onSubmit={form.handleSubmit(onSubmit, onError)}>
        <fieldset disabled={form.formState.isSubmitting}>
          <Stack spacing={SPACING.formStack}>{children}</Stack>
        </fieldset>
      </form>
    </FormProvider>
  )
}
