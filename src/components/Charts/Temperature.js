import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mounted () {
    this.renderChart(
      {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [
          {
            label: 'Temperature',
            data: [30, 25, 28, 0, 18, 9],
            backgroundColor: 'transparent',
            borderColor: 'rgba(247, 134, 29, 0.50)',
            pointBackgroundColor: 'rgba(247, 134, 29, 1)'
          }
        ]
      },
      {
        responsive: true, maintainAspectRatio: false
      }
    )
  }
}
