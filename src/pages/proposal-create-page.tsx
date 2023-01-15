import { redirect, useParams } from 'react-router-dom'

import { defaultDelegateFormValues } from 'util/form.constants'
import { uuid } from 'util/helpers'

import { useGroup } from 'hooks/use-query'

import { Loading } from '@/molecules'
import { type ProposalFormValues } from '@/organisms/proposal-form'
import { ProposalTemplate } from '@/templates/proposal-template'

const steps = ['Propose Action', 'Review Proposal', 'Proposal Open']

export default function ProposalCreate() {
  const { groupId } = useParams()
  const { data: group, isLoading } = useGroup(groupId)

  if (isLoading) return <Loading />
  if (!group) {
    redirect('/')
    return null
  }

  async function handleSubmit(values: ProposalFormValues): Promise<boolean> {
    console.log('proposal values :>> ', values)
    return true
  }

  return (
    <ProposalTemplate
      initialProposalFormValues={{
        actions: [{ id: uuid(), type: 'stake', values: defaultDelegateFormValues }],
        // TODO: set initial title / description based on the number of
        // previous proposals?
        title: 'Proposal Title',
        description: 'Proposal Description',
      }}
      groupName={group.metadata.name}
      submit={handleSubmit}
      steps={steps}
    />
  )
}
