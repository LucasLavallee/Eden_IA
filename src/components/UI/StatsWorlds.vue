<template>
  <div class="statsWorld">
    <p>Stats</p>
    <ul>
      <li>Present species : {{ getWorldsInfos.bornNaturally }}</li>
      <li>Planted invidual : {{ }}</li>
      <li>Born naturally : {{  }}</li>
      <li>Dead : {{  }}</li>
    </ul>

    <!--<p>Vegetables</p>
    <ul>
      <li>Beets :</li>
      <li>Carots :</li>
      <li>Pepper :</li>
      <li>Pumpkins :</li>
      <li>Zucchinis :</li>
    </ul>

    <p>Fruits</p>
    <ul>
      <li>Bananas :</li>
      <li>Oranges :</li>
      <li>Pears :</li>
      <li>Strawberries :</li>
      <li>Tomatos :</li>
    </ul>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'StatsWorlds',
	data() {
      return {
        worldsInfos: null
      }
  },
  computed: {
    ...mapGetters([
      'getWorldsInfos'
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
