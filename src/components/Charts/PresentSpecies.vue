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
      presentSpeciesArray:[],
      labelArray: [],
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 10
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
    if(this.presentSpeciesArray.length >= 11){
          this.presentSpeciesArray.shift()
      } else {
        this.presentSpeciesArray.push(store.getters.getNumberOfPresentSpecies)
      }

      if(this.labelArray.length >= 11){
          this.labelArray.shift()
      } else {
        this.labelArray.push(store.getters.getCurrentTime)
      }
    
      this.chartPresentSpecies = {
        labels: this.labelArray,
        datasets: [
          {
            label: 'Present species',
            backgroundColor: 'transparent',
            borderColor: 'rgba(247, 134, 29, 0.50)',
            pointBackgroundColor: 'rgba(247, 134, 29, 1)',
            data: this.presentSpeciesArray
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
