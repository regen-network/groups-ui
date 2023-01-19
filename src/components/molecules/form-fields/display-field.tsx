import { ReactNode } from 'react'
import { useSnapshot } from 'valtio'

import { formatFee } from 'util/helpers'

import { Chain } from 'store'

import { FormControl, FormLabel, Heading } from '@/atoms/chakra-components'

/** for displaying decorative / read-only data in field area of forms without
 * actually modifying form data */
const DisplayField = ({ label, children }: { label: string; children: ReactNode }) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    {children}
  </FormControl>
)

/** displays the current transaction fee in a form-style friendly manner
 * NOTE: this molecule connects with global chain store to avoid boilerplate where used, which breaks atomic design some */
export const FeeDisplayField = () => {
  const { fee } = useSnapshot(Chain)
  return (
    <DisplayField label="Transaction Fee">
      <Heading variant="label" size="xs">
        {formatFee(fee)}
      </Heading>
    </DisplayField>
  )
}
