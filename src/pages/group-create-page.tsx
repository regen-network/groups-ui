import { useState } from 'react'

import type { GroupWithPolicyFormValues } from 'types'
import { handleError } from 'util/errors'
import { defaultGroupFormValues, defaultGroupPolicyFormValues } from 'util/form.constants'

import { createGroupWithPolicy } from 'api/group.actions'
import { useTxToasts } from 'hooks/useToasts'
import { Wallet } from 'store/wallet.store'

import { GroupTemplate } from '@/templates/group-template'

export default function GroupCreate() {
  const { toastErr, toastSuccess } = useTxToasts()
  const [newGroupId, setNewGroupId] = useState<string>()

  async function handleCreate(values: GroupWithPolicyFormValues): Promise<boolean> {
    try {
      const { transactionHash, groupId } = await createGroupWithPolicy(values)
      setNewGroupId(groupId?.toString())
      toastSuccess(transactionHash, 'Group created!')
      return true
    } catch (err) {
      handleError(err)
      toastErr(err, 'Group could not be created:')
      return false
    }
  }

  if (!Wallet.account?.address) return null

  return (
    <GroupTemplate
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
