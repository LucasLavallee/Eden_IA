<template>
  <div id="miniWorldInfos">
    <span>Mini World n°{{currentWorld}}</span><br/>
    <span>Temperature: {{this.getTemperature}}</span><br/>
    <span>Brightness: {{this.getBrightness}}</span><br/>
    <span>Humidity: {{this.getHumidity}}</span><br/>
    <span>Pollution: {{this.getPollution}}</span><br/>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  name: 'ModeSelection',
  data () {
    return {
      currentWorld: 0
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters([
      'getActiveWorld',
      'getTemperature',
      'getBrightness',
      'getHumidity',
      'getPollution'
    ])
  }
}
</script>

<style lang="stylus">
  #miniWorldInfos
    position fixed
    top 90px
    left 50%
    transform translate3d(-50%, 0, 0)
    font-size 20px

</style>
