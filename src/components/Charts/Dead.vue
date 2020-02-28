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
      deadArray: [],
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
      'getNumberOfDead',
      'getCurrentTime'
    ])
  },
  methods: {
    generateData: function () {
      if(this.deadArray.length >= 11){
        this.deadArray.shift()
      } else {
        this.deadArray.push(store.getters.getNumberOfDead)
      }

      if(this.labelArray.length >= 11){
        this.labelArray.shift()
      } else {
        this.labelArray.push(store.getters.getCurrentTime)
      } 
    
      this.chartDead = {
        labels: this.labelArray,
        datasets: [
          {
            label: 'Dead',
            backgroundColor: 'transparent',
            borderColor: 'rgba(0, 0, 0, 0.50)',
            pointBackgroundColor: 'rgba(0, 0, 0, 1)',
            data: this.deadArray,
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
