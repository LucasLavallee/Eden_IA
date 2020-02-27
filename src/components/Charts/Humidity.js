import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mounted () {
    this.renderChart(
      {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [
          {
            label: 'Humidity',
            data: [0, 10, 40, 20, 80, 3],
            backgroundColor: 'transparent',
            borderColor: 'rgba(29, 178, 247, 0.50)',
            pointBackgroundColor: 'rgba(29, 178, 247, 1)'
          }
        ]
      },
      {
        responsive: true, maintainAspectRatio: false
      }
    )
  }
}
