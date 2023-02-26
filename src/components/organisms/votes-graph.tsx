import { Doughnut } from 'react-chartjs-2'
import {
  ArcElement,
  Chart as ChartJS,
  DoughnutController,
  // Legend,
  Tooltip,
} from 'chart.js'

ChartJS.register(DoughnutController, ArcElement, Tooltip)

export const VotesGraph = () => {
  return (
    <Doughnut
      data={{
        labels: ['Yes', 'No', 'Abstain'],
        datasets: [
          {
            label: 'Proposal votes',
            data: [4, 1, 2],
            backgroundColor: ['darkSeaGreen', 'tomato', 'PaleGoldenRod'],
          },
        ],
      }}
    />
  )
}
