import { TallyResult } from '@regen-network/api/types/codegen/cosmos/group/v1/types'

import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@/atoms'
import { TableTitlebar } from '@/molecules/table-titlebar'

export const ProposalFinalTallyTable = ({
  finalTallyResult,
}: {
  finalTallyResult: TallyResult
}) => {
  return (
    <TableContainer>
      <TableTitlebar title="Final Tally Results" />
      <Table variant="striped" size="lg">
        <Thead>
          <Tr>
            <Th>Yes</Th>
            <Th>No</Th>
            <Th>Abstain</Th>
            <Th>No with veto</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{finalTallyResult.yesCount}</Td>
            <Td>{finalTallyResult.noCount}</Td>
            <Td>{finalTallyResult.abstainCount}</Td>
            <Td>{finalTallyResult.noWithVetoCount}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
