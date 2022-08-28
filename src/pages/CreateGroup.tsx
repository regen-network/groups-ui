import { defaultGroupFormValues } from 'models'
import { createGroup } from 'store/Group'

import { GroupForm } from '@/organisms/GroupForm'
import { StepperTemplate } from '@/templates/StepperTemplate'

export default function CreateGroup() {
  return (
    <StepperTemplate
      activeStep={0}
      steps={['Create Group', 'Create Group Policy', 'Finished']}
      // nextBtn={{ text: 'Next', onClick: () => void null }}
    >
      <GroupForm onSubmit={createGroup} defaultValues={defaultGroupFormValues} />
    </StepperTemplate>
  )
}
