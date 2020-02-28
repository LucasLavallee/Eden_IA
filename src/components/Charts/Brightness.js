import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mounted () {
    this.renderChart(
      {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [
          {
            label: 'Brightness',
            // appeler getWorldsInfos et presentSpecies
            data: [1, 8, 3, 10, 0, 9],
            backgroundColor: 'transparent',
            borderColor: 'rgba(247, 214, 29, 0.50)',
            pointBackgroundColor: 'rgba(247, 214, 29, 1)'
          }
        ]
      },
      {
        responsive: true, maintainAspectRatio: false
      }
    )
  }
}
