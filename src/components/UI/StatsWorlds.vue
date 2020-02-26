<template>
  <div class="statsWorld">
    <p>Stats</p>
    <ul>
      <li>Present species : {{ getNumberOfPresentSpecies }}</li>
      <li>Planted invidual : {{ getNumberOfPlanted }}</li>
      <li>Born naturally : {{ getNumberOfBornNaturally }}</li>
      <li>Dead : {{ getNumberOfDead }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'StatsWorlds',
	data() {
      return {
        worldsInfos: null,
      }
  },
  computed: {
    ...mapGetters([
      'getWorldsInfos',
      'getNumberOfPresentSpecies',
      'getNumberOfPlanted',
      'getNumberOfBornNaturally',
      'getNumberOfDead',
    ])
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
  .statsWorld
    position fixed
    top 400px
    right 30px
    background-color #212121
    padding 20px
    border-radius 20px
    color #F9F9F9

  .statsWorld p
    font-size 20px
    margin-top 0
    font-weight bold

   .statsWorld ul
     padding-left 20px
     margin-bottom 0
     text-align left

  .statsWorld ul li
    list-style-type "\1F331"
    margin 5px 0
</style>
