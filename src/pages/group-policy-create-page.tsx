import { useParams } from 'react-router-dom'

import type { GroupWithPolicyFormValues } from 'types'
import { logError } from 'util/errors'
import { defaultGroupFormValues, defaultGroupPolicyFormValues } from 'util/form.defaults'

import { createGroupPolicy } from 'api/policy.actions'
import { useTxToasts } from 'hooks/use-toasts'
import { Wallet } from 'store/wallet.store'

import { GroupCRUDTemplate } from '@/templates/group-crud-template'

export default function GroupPolicyCreate() {
  const { toastErr, toastSuccess } = useTxToasts()
  const { groupId } = useParams()

  async function handleCreate({
    policyType,
    percentage,
    threshold,
    votingWindow,
  }: GroupWithPolicyFormValues): Promise<boolean> {
    try {
      if (groupId) {
        const { transactionHash, policyAddress } = await createGroupPolicy({
          groupId,
          admin: Wallet.account?.address as string,
          policyType,
          percentage,
          threshold,
          votingWindow,
        })
        toastSuccess(transactionHash, `Group policy ${policyAddress} created!`)
        return true
      }
      return false
    } catch (err) {
      logError(err)
      toastErr(err, 'Group policy could not be created:')
      return false
    }
  }

  if (!Wallet.account?.address) return null

  return (
    <GroupCRUDTemplate
      newGroupId={groupId}
      initialGroupFormValues={{
        ...defaultGroupFormValues,
        admin: Wallet.account?.address,
      }}
      initialPolicyFormValues={{
        ...defaultGroupPolicyFormValues,
      }}
      text={{
        submitBtn: 'Submit',
        finished: 'You have successfully set up your group policy.',
      }}
      steps={['Create Group Policy', 'Finished']}
      submit={handleCreate}
    />
  )
}
