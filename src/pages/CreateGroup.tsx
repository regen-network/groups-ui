import { cosmos } from '@haveanicedavid/groups-ui-telescope'
const { createGroup } = cosmos.group.v1.MessageComposer.withTypeUrl

import { type GroupFormValues, defaultGroupFormValues } from 'models'
import { wallet } from 'store'
import { throwError } from 'util/errors'

import { GroupForm } from '@/organisms'
import { StepperTemplate } from '@/templates'

export default function CreateGroup() {
  async function handleSubmit(values: GroupFormValues) {
    const { account, signingClient, fee } = wallet
    if (!account || !signingClient || !fee) throwError('Wallet not initialized')
    try {
      const msg = _createGroupMsg(values)
      const data = await signingClient.signAndBroadcast(account.address, [msg], fee)
      console.log('data !!!!!!!! :>> ', data)
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

/** Take form values and return a msg to be broadcast */
function _createGroupMsg({
  admin,
  members,
  name,
  description,
  forumLink,
  otherMetadata,
}: GroupFormValues) {
  return createGroup({
    admin,
    metadata: JSON.stringify({
      name,
      description,
      forumLink,
      other: otherMetadata,
    }),
    members: members.map((m) => ({
      address: m.address,
      weight: m.weight.toString(),
      metadata: JSON.stringify(m.metadata),
    })),
  })
}
