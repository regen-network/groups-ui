import { defaultGroupFormValues } from 'models'
import { createGroup } from 'store'

import { GroupForm } from '@/organisms'
import { StepperTemplate } from '@/templates'

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
