import { redirect, useParams } from 'react-router-dom'

import { handleError } from 'util/errors'

import { msgUpdateGroupMembers } from 'api/member.messages'
import { useGroup, useGroupMembers, useGroupPolicies } from 'hooks/use-query'
import { useTxToasts } from 'hooks/use-toasts'
import { signAndBroadcast } from 'store/wallet.store'

import { Loading } from '@/molecules/loading'
import { type GroupMembersTableProps } from '@/organisms/group-members-table'
import { GroupDetailsTemplate } from '@/templates/group-details-template'

export default function GroupDetailsPage() {
  const { groupId } = useParams()
  const { data: group, isLoading: loadingGroup } = useGroup(groupId)
  const { data: members, refetch: refetchMembers } = useGroupMembers(groupId)
  const { data: policies, isLoading: loadingPolicies } = useGroupPolicies(groupId)
  const { toastSuccess, toastErr } = useTxToasts()
  const [policy] = policies ?? []
  const policyIsAdmin = policy?.admin === policy?.address

  if (loadingGroup || loadingPolicies) return <Loading />
  if (!group || !groupId) {
    handleError('Missing group or group ID, redirecting')
    redirect('/')
    return null
  }

  const handleUpdateMembers: GroupMembersTableProps['onSave'] = async (values) => {
    const msg = msgUpdateGroupMembers({
      groupId: group.id, // TODO: change to groupId?
      admin: group.admin,
      members: values,
    })
    try {
      const { transactionHash } = await signAndBroadcast([msg])
      toastSuccess(transactionHash)
      refetchMembers()
      return true
    } catch (err) {
      handleError(err)
      toastErr(err, 'Editing group')
      return false
    }
  }

  return (
    <GroupDetailsTemplate
      admin={policyIsAdmin ? 'Group Policy' : policy?.admin}
      description={group.metadata.description}
      id={groupId}
      members={members || []}
      name={group.metadata.name}
      onMembersSave={handleUpdateMembers}
      policies={policies || []}
    />
  )
}
