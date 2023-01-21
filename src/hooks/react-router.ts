import { type Location, useLocation } from 'react-router'

import type { ProposalAction } from 'types'

interface AppLocation extends Location {
  state: { newProposalType?: ProposalAction['type'] }
}

export const useAppLocation = (): AppLocation => useLocation() as AppLocation
