import { Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

import { ProposalUpdateGroupFormValues } from 'types'
import { SPACING } from 'util/constants'

import { isDecisionPolicyValues, isMembersValues } from 'api/update-group.utils'

import { FormCard } from './form-card'
import { ReviewItem } from './review-item'
import { Truncate } from './truncate'

const titlesMap = {
  'decision-policy': 'Update group decision policy',
  members: 'Update group members',
  metadata: 'Update group metadata',
}
export const UpdateGroupReview = ({
  values,
}: {
  values: ProposalUpdateGroupFormValues
}) => {
  const { updateGroupType } = values
  return (
    <FormCard title={titlesMap[updateGroupType]}>
      <Stack spacing={SPACING.formStack}>
        {isDecisionPolicyValues(values) && (
          <>
            <ReviewItem label="voting window">{values.votingWindow}</ReviewItem>
            <ReviewItem label={values.policyType}>
              {values.threshold || values.percentage}
            </ReviewItem>
          </>
        )}
        {isMembersValues(values) && (
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Accounts</Th>
                  <Th>Voting weights</Th>
                </Tr>
              </Thead>
              <Tbody fontSize={14}>
                {values.members.map((m) => (
                  <Tr key={m.address}>
                    <Td>{m.address}</Td>
                    <Td>{m.weight}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </FormCard>
  )
}
