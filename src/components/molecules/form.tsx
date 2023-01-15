import { ComponentProps } from 'react'
import {
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
  FormProvider,
} from 'react-hook-form'

import { SPACING } from 'util/style.constants'

import { Stack } from '@/atoms'

interface Props<T extends FieldValues> extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: Props<T>) => (
  <FormProvider {...form}>
    <form {...props} onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset disabled={form.formState.isSubmitting}>
        <Stack spacing={SPACING.formStack}>{children}</Stack>
      </fieldset>
    </form>
  </FormProvider>
)
