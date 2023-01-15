import { useForm, UseFormProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TypeOf, ZodSchema } from 'zod'

interface UseZodFormProps<Z extends ZodSchema>
  extends Exclude<UseFormProps<TypeOf<Z>>, 'resolver'> {
  schema: Z
}

/** small wrapper to avoid resolver boilerplate / extra import */
export const useZodForm = <Z extends ZodSchema>({
  schema,
  ...formProps
}: UseZodFormProps<Z>) =>
  useForm({
    ...formProps,
    resolver: zodResolver(schema),
  })
