import { Doughnut } from 'react-chartjs-2'
import { ArcElement, Chart as ChartJS, DoughnutController, Tooltip } from 'chart.js'
import { mapValues } from 'remeda'

import type { TallyResult, Vote } from 'types'
import { VoteOption } from 'util/enums'

ChartJS.register(DoughnutController, ArcElement, Tooltip)

function isVotes(votes: TallyResult | Vote[] | undefined): votes is Vote[] {
  return Array.isArray(votes)
}

type TallyResultNumber = {
  [key in keyof TallyResult]: number
}

function votesToTallyResult(votes: Vote[]): TallyResult {
  const totals = votes.reduce(
    (result, curr) => {
      switch (curr.option) {
        case VoteOption.VOTE_OPTION_ABSTAIN:
          result.abstainCount++
          break
        case VoteOption.VOTE_OPTION_YES:
          result.yesCount++
          break
        case VoteOption.VOTE_OPTION_NO:
          result.noCount++
          break
        case VoteOption.VOTE_OPTION_NO_WITH_VETO:
          result.noWithVetoCount++
          break
        default:
          break
      }
      return result
    },
    {
      abstainCount: 0,
      yesCount: 0,
      noCount: 0,
      noWithVetoCount: 0,
    } as TallyResultNumber,
  )
  return mapValues(totals, (v) => v.toString())
}

export const VotesGraph = ({ votes }: { votes: TallyResult | Vote[] | undefined }) => {
  if (!votes) return null
  const data = isVotes(votes) ? votesToTallyResult(votes) : votes

  return (
    <Doughnut
      data={{
        labels: ['Yes', 'No', 'No with Veto', 'Abstain'],
        datasets: [
          {
            label: 'Proposal votes',
            data: [data.yesCount, data.noCount, data.noWithVetoCount, data.abstainCount],
            backgroundColor: ['darkSeaGreen', 'tomato', 'darkRed', 'PaleGoldenRod'],
          },
        ],
      }}
    />
  )
}
