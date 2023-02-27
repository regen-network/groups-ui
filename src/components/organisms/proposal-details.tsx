import type { UIProposal } from 'types'
import { formatDate } from 'util/date'

import { Card, CardBody, CardHeader, Flex, Heading, Stack, Text } from '@/atoms'
import { JSONDisplay } from '@/molecules/json-display'

const Detail = (props: { label: string; text: string }) => {
  return (
    <Stack spacing={2} direction="column">
      <Heading variant="label">{props.label}</Heading>
      <Text>{props.text}</Text>
    </Stack>
  )
}

export const ProposalDetails = ({ proposal }: { proposal: UIProposal }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Proposal Details</Heading>
      </CardHeader>
      <Flex wrap="wrap">
        <CardBody>
          <Stack direction="column" spacing={8}>
            <Detail label="Proposer" text={proposal.proposers[0]} />
            {/* <Detail label="Height" text={'TODO - not in proposal data'} /> */}
            {proposal.submitTime && (
              <Detail
                label="Submit Time"
                text={formatDate(proposal.submitTime, 'long')}
              />
            )}
            <Detail
              label="Voting End time"
              text={formatDate(proposal.votingPeriodEnd, 'long')}
            />
          </Stack>
        </CardBody>
        <CardBody>
          <Stack spacing={3}>
            <Heading variant="label">Metadata</Heading>
            <JSONDisplay data={proposal.metadata} />
          </Stack>
        </CardBody>
      </Flex>
    </Card>
  )
}
