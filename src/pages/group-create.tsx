import { useState } from 'react'

import { type GroupWithPolicyFormValues } from 'types'
import { toErrorWithMessage } from 'util/errors'
import { defaultGroupFormValues, defaultGroupPolicyFormValues } from 'util/form.constants'
import { TOAST_DEFAULTS } from 'util/style.constants'

import { Wallet } from 'store'
import { createGroupWithPolicy } from 'api/group.actions'
import { useToast } from 'hooks/chakra'

import GroupTemplate from '@/templates/group-template'

export default function GroupCreate() {
  const toast = useToast()
  const [newGroupId, setNewGroupId] = useState<string>()
  async function handleCreate(values: GroupWithPolicyFormValues) {
    try {
      const { transactionHash, groupId } = await createGroupWithPolicy(values)
      setNewGroupId(groupId?.toString())
      const time = 3000
      toast({
        ...TOAST_DEFAULTS,
        title: 'Group created',
        description: 'Transaction hash: ' + transactionHash,
        status: 'success',
        duration: time,
      })
    } catch (err) {
      const msg = toErrorWithMessage(err).message
      console.error(err)
      toast({
        ...TOAST_DEFAULTS,
        title: 'Group creation failed',
        description: msg,
        status: 'error',
        duration: 9000,
      })
    }
  }

  if (!Wallet.account?.address) return null

  return (
    <GroupTemplate
      linkToGroupId={newGroupId}
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
