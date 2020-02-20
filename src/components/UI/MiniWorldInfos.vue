<template>
  <div id="miniWorldInfos">
    <span>Mini World n°{{getActiveWorld}}</span><br/>
    {{getWorldsInfos[getActiveWorld]}}
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
      'getPollution',
      'getWorldsInfos'
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
