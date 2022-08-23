import { CreateGroupForm } from '@/organisms'
import { StepperTemplate } from '@/templates'

const CreateGroup = () => {
  return (
    <StepperTemplate
      activeStep={0}
      steps={['Create Group', 'Create Group Policy', 'Finished']}
    >
      <CreateGroupForm />
    </StepperTemplate>
  )
}

export default CreateGroup
