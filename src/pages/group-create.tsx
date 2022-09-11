import { type GroupWithPolicyFormValues, defaultGroupFormValues } from 'models'
import { TOAST_DEFAULTS } from 'util/constants'
import { toErrorWithMessage } from 'util/errors'

import { Wallet } from 'store'
import { createGroupWithPolicy } from 'api/group.actions'
import { useToast } from 'hooks/chakra'

import { defaultGroupPolicyFormValues } from '@/organisms/group-policy-form'
import GroupTemplate from '@/templates/group-template'

export default function GroupCreate() {
  const toast = useToast()
  async function handleCreate(values: GroupWithPolicyFormValues) {
    try {
      const { transactionHash } = await createGroupWithPolicy(values)
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
      defaultFormValues={{
        ...defaultGroupPolicyFormValues,
        ...defaultGroupFormValues,
        admin: Wallet.account?.address,
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
