import { useState } from 'react'

import type { GroupWithPolicyFormValues } from 'types'
import { logError } from 'util/errors'
import { defaultGroupFormValues, defaultGroupPolicyFormValues } from 'util/form.defaults'

import { createGroupWithPolicy } from 'api/group.actions'
import { useTxToasts } from 'hooks/use-toasts'
import { Wallet } from 'store/wallet.store'

import { GroupCRUDTemplate } from '@/templates/group-crud-template'

export default function GroupCreate() {
  const { toastErr, toastSuccess } = useTxToasts()
  const [newGroupId, setNewGroupId] = useState<string>()

  async function handleCreate(values: GroupWithPolicyFormValues): Promise<boolean> {
    try {
      const { transactionHash, groupId } = await createGroupWithPolicy(values)
      setNewGroupId(groupId?.toString())
      toastSuccess(transactionHash)
      return true
    } catch (err) {
      logError(err)
      toastErr(err, 'Group could not be created:')
      return false
    }
  }

  if (!Wallet.account?.address) return null

  return (
    <GroupCRUDTemplate
      newGroupId={newGroupId}
      initialGroupFormValues={{
        ...defaultGroupFormValues,
        admin: Wallet.account?.address,
      }}
      initialPolicyFormValues={{
        ...defaultGroupPolicyFormValues,
      }}
      text={{
        submitBtn: 'Submit',
        finished: 'You have successfully set up your group and group policy.',
      }}
      steps={['Create Group', 'Create Group Policy', 'Finished']}
      submit={handleCreate}
    />
  )
}
