<template>
  <div class="chart">
    <BornNaturally class="bornChart" :width="200" :height="250" :chart-data="chartBornNaturally" :options="options"></BornNaturally>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '@/store'

import BornNaturally from '@/components/Charts/BornNaturally.js'

export default {
  name: 'plantedIndividualChart',
  components: {
    BornNaturally
  },
  data () {
    return {
      chartBornNaturally: null,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
              /* stepSize: 2,
              maxTicksLimit: 10 */
            }
          }],
          xAxes: [{
            ticks: {
              maxTicksLimit: 10
            }
          }]
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'getNumberOfBornNaturally',
      'getCurrentTime'
    ])
  },
  methods: {
    generateData: function () {
      let bornArray = []
      let labelArray = []
      for(let i=0 ; i<10 ; i++) {
        bornArray.push(store.getters.getNumberOfBornNaturally)
        if(labelArray.length >= 11){
          labelArray.shift()
        } else {
          labelArray.push(store.getters.getCurrentTime)
        } 
      }
    
      this.chartBornNaturally = {
        labels: labelArray,
        datasets: [
          {
            label: 'Born naturally',
            backgroundColor: 'transparent',
            borderColor: 'rgba(34, 210, 241, 0.50)',
            pointBackgroundColor: 'rgba(34, 210, 241, 1)',
            data: bornArray
          }
        ]
      }
    }
  },
  mounted() {
    setInterval(this.generateData, 2000)
  }
}
</script>

<style lang=stylus>
  .bornChart{
    width 150%
    height 30%
  }
</style>
