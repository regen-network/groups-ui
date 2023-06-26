import { type Location, useLocation } from 'react-router'

import type { ProposalAction, ProposalUpdateGroupFormValues } from 'types'

interface AppLocation extends Location {
  state: {
    newProposalType?: ProposalAction['type']
    newUpdateGroupProposalValues?: ProposalUpdateGroupFormValues
  }
}

export const useAppLocation = (): AppLocation => useLocation() as AppLocation
