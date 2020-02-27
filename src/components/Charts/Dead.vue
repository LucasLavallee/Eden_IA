<template>
  <div class="chart">
    <Dead class="deadChart" :width="200" :height="250" :chart-data="chartDead" :options="options"></Dead>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '@/store'

import Dead from '@/components/Charts/Dead.js'

export default {
  name: 'DeadChart',
  components: {
    Dead
  },
  data () {
    return {
      chartDead: null,
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
      'getNumberOfDead',
      'getCurrentTime'
    ])
  },
  methods: {
    generateData: function () {
      let deadArray = []
      let labelArray = []
      for(let i=0 ; i<10 ; i++) {
        deadArray.push(store.getters.getNumberOfDead)
        if(labelArray.length >= 11){
          labelArray.shift()
        } else {
          labelArray.push(store.getters.getCurrentTime)
        } 
      }
    
      this.chartDead = {
        labels: labelArray,
        datasets: [
          {
            label: 'Dead',
            backgroundColor: 'transparent',
            borderColor: 'rgba(0, 0, 0, 0.50)',
            pointBackgroundColor: 'rgba(0, 0, 0, 1)',
            data: deadArray,
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
  .deadChart{
    width 150%
    height 30%
  }
</style>
