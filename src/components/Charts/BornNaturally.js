import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartBornNaturally', 'options'],
  mounted(){
    this.renderChart(this.chartBornNaturally, this.options)
  }
}
