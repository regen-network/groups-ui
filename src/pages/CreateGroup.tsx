import { type GroupFormValues, defaultGroupFormValues } from 'models'
import { Wallet } from 'store'
import { createGroupMsg } from 'store/Group/Group.actions'
import { throwError } from 'util/errors'

import { GroupForm } from '@/organisms'
import { StepperTemplate } from '@/templates'

export default function CreateGroup() {
  async function handleSubmit(values: GroupFormValues) {
    const { account, signingClient, fee } = Wallet
    if (!account || !signingClient || !fee) throwError('Wallet not initialized')
    try {
      const msg = createGroupMsg(values)
      const data = await signingClient.signAndBroadcast(account.address, [msg], fee)
      console.log('data:  >> ', data)
    } catch (error) {
      throwError(error)
    }
  }

  return (
    <StepperTemplate
      activeStep={0}
      steps={['Create Group', 'Create Group Policy', 'Finished']}
      // nextBtn={{ text: 'Next', onClick: () => void null }}
    >
      <GroupForm onSubmit={handleSubmit} defaultValues={defaultGroupFormValues} />
    </StepperTemplate>
  )
}
