import type { UIProposal } from 'types'

import { ProposalTemplate } from '@/templates/proposal-template'

const steps = ['Propose Action', 'Review Proposal', 'Proposal Open']

export default function ProposalCreate() {
  return (
    <ProposalTemplate
      steps={steps}
      proposal={
        {
          metadata: {
            title: 'Proposal Title',
            description: 'Proposal Description',
          },
        } as UIProposal
      }
    />
  )
}
