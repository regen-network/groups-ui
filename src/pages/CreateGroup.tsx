// import { MsgClientImpl } from '@haveanicedavid/groups-ui-telescope/types/proto/cosmos/group/v1/tx.rpc.msg'

import { MsgClientImpl } from '@haveanicedavid/groups-ui-telescope/types/proto/cosmos/group/v1/tx.rpc.msg'

import { defaultGroupFormValues, MsgCreateGroup } from 'models'
import { walletStore } from 'store'

import { GroupForm } from '@/organisms'
import { StepperTemplate } from '@/templates'

// const t = new MsgClientImpl({request(service, method, data)})

const CreateGroup = () => {
  // const transformValues
  // walletStore.client?.

  return (
    <StepperTemplate
      activeStep={0}
      steps={['Create Group', 'Create Group Policy', 'Finished']}
      nextBtn={{ text: 'Next', onClick: () => void null }}
    >
      <GroupForm onSubmit={console.log} defaultValues={defaultGroupFormValues} />
    </StepperTemplate>
  )
}

export default CreateGroup
