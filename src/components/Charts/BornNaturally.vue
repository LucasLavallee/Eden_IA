<template>
  <div class="chart">
    <BornNaturally class="bornChart" :width="200" :height="250" :chart-data="chartBornNaturally" :options="options"></BornNaturally>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '@/store'
import constant from 'utils/constant'

import BornNaturally from '@/components/Charts/BornNaturally.js'

export default {
  name: 'plantedIndividualChart',
  components: {
    BornNaturally
  },
  data () {
    return {
      chartBornNaturally: null,
      bornArray: [],
      labelArray:[],
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
      'getNumberOfBornNaturally',
      'getCurrentTime'
    ])
  },
  methods: {
    generateData: function () {
      if(this.bornArray.length >= 11){
        this.bornArray.shift()
      } else {
        this.bornArray.push(store.getters.getNumberOfBornNaturally)
      }   

      if(this.labelArray.length >= 11){
        this.labelArray.shift()
      }
      else {
        this.labelArray.push(Math.trunc(store.getters.getCurrentTime / constant.TIME_INFOS.YEAR_TIME))
      }
    
      this.chartBornNaturally = {
        labels: this.labelArray,
        datasets: [
          {
            label: 'Born naturally',
            backgroundColor: 'transparent',
            borderColor: 'rgba(34, 210, 241, 0.50)',
            pointBackgroundColor: 'rgba(34, 210, 241, 1)',
            data: this.bornArray
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
