import { StepperTemplate } from '@/templates'

const CreateGroup = () => {
  return (
    <StepperTemplate
      activeStep={0}
      steps={['Create Group', 'Create Group Policy', 'Finished']}
    >
      content
    </StepperTemplate>
  )
}

export default CreateGroup
