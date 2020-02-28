import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartDead', 'options'],
  mounted(){
    this.renderChart(this.chartDead, this.options)
  }
}
