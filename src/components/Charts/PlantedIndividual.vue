<template>
  <div class="chart">
    <PlantedIndividual class="plantedChart" :width="200" :height="250" :chart-data="chartPlantedInvidividual" :options="options"></PlantedIndividual>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '@/store'
import constant from 'utils/constant'

import PlantedIndividual from '@/components/Charts/PlantedIndividual.js'

export default {
  name: 'plantedIndividualChart',
  components: {
    PlantedIndividual
  },
  data () {
    return {
      chartPlantedInvidividual: null,
      plantedArray: [],
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
      'getNumberOfPlanted',
      'getCurrentTime'
    ])
  },
  methods: {
    generateData: function () {
      if(this.getNumberOfPlanted.length >= 11){
        this.plantedArray.shift()
      } else {
        this.plantedArray.push(store.getters.getNumberOfPlanted)
      }

      if(this.labelArray.length >= 11){
        this.labelArray.shift()
      } else {
        this.labelArray.push(Math.trunc(store.getters.getCurrentTime / constant.TIME_INFOS.YEAR_TIME))
      } 
    
      this.chartPlantedInvidividual = {
        labels: this.labelArray,
        datasets: [
          {
            label: 'Planted Individual',
            backgroundColor: 'transparent',
            borderColor: 'rgba(12, 182, 23, 0.50)',
            pointBackgroundColor: 'rgba(12, 182, 23, 1)',
            data: this.plantedArray
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
