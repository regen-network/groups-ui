import type { UIProposal } from 'types'
import { SPACING } from 'util/style.constants'

import { Flex, Heading, PageContainer, Stack, Text } from '@/atoms'
import { EditableDescription, EditableHeading, PageStepper } from '@/molecules'
import { ProposalStakeForm } from '@/organisms/proposal-stake-form'

type Props = {
  steps: string[]
  proposal: UIProposal
}

export function ProposalTemplate({ proposal, steps }: Props) {
  const { title, description } = proposal.metadata
  return (
    <Flex direction="column">
      <PageStepper activeStep={0} steps={steps} />
      <PageContainer maxW={SPACING.formWidth}>
        <Stack spacing={3}>
          <EditableHeading
            value={title}
            onSubmit={(value) => console.log('heading change:', value)}
          />
          <EditableDescription
            value={description}
            onSubmit={(value) => console.log('description changed: ', value)}
          />

          <Flex align="baseline" pb={3}>
            <Heading variant="label" size="xs">
              Group:
            </Heading>
            <Text ml={2}>Group name</Text>
          </Flex>
          <ProposalStakeForm />
        </Stack>
      </PageContainer>
    </Flex>
  )
}
