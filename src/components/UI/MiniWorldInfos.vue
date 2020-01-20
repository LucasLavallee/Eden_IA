<template>
  <div id="miniWorldInfos">
    <span>Mini World n°{{getActiveWorld}}</span>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  name: 'ModeSelection',
  data () {
    return {
      currentWorld: this.getActiveWorld
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters([
      'getActiveWorld'
    ])
  }
}
</script>

<style lang="stylus">
  #miniWorldInfos
    position fixed
    top 20px
    right 20px
    font-size 20px

</style>
