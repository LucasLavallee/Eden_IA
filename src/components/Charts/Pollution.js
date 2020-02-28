import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mounted () {
    this.renderChart(
      {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [
          {
            label: 'Pollution',
            data: [0, 5, 20, 18, 4, 9],
            backgroundColor: 'transparent',
            borderColor: 'rgba(0, 0, 0, 0.50)',
            pointBackgroundColor: 'rgba(0, 0, 0, 1)'
          }
        ]
      },
      {
        responsive: true, maintainAspectRatio: false
      }
    )
  }
}
