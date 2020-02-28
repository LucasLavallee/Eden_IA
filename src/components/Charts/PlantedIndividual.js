import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartPlantedInvidividual', 'options'],
  mounted(){
    this.renderChart(this.chartPlantedInvidividual, this.options)
  }
}
