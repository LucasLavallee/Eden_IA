<template>
  <div class="chart">
    <PresentSpecies class="presentChart" :width="200" :height="250" :chart-data="chartPresentSpecies" :options="options"></PresentSpecies>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '@/store'

import PresentSpecies from '@/components/Charts/PresentSpecies.js'

export default {
  name: 'presentSpeciesChart',
  components: {
    PresentSpecies
  },
  data () {
    return {
      chartPresentSpecies: null,
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
      'getNumberOfPresentSpecies',
      'getCurrentTime'
    ])
  },
  methods: {
    generateData: function () {
      let presentSpeciesArray = []
      let labelArray = []
      for(let i=0 ; i<10 ; i++) {
        presentSpeciesArray.push(store.getters.getNumberOfPresentSpecies)
        labelArray.push(store.getters.getCurrentTime)
      }
    
      this.chartPresentSpecies = {
        labels: labelArray,
        datasets: [
          {
            label: 'Present species',
            backgroundColor: 'transparent',
            borderColor: 'rgba(247, 134, 29, 0.50)',
            pointBackgroundColor: 'rgba(247, 134, 29, 1)',
            data: presentSpeciesArray
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
  .presentChart{
    width 150%
    height 30%
  }
</style>
