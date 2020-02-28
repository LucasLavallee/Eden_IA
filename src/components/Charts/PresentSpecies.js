import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartPresentSpecies', 'options'],
  mounted(){
    this.renderChart(this.chartPresentSpecies, this.options)
  }
}
