import { defaultGroupFormValues } from 'models'

import { GroupForm } from '@/organisms'
import { StepperTemplate } from '@/templates'

const CreateGroup = () => {
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
