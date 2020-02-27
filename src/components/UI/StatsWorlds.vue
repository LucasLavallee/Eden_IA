<template>
  <div class="statsWorld">
    <p>Stats</p>
    <ul>
      <li>Present species : {{ getNumberOfPresentSpecies }}</li>
      <li>Planted invidual : {{ getNumberOfPlanted }}</li>
      <li>Born naturally : {{ getNumberOfBornNaturally }}</li>
      <li>Dead : {{ getNumberOfDead }}</li>
      <button type="button" id="show-modal" @click="onShowModal()">See more</button>
    </ul>

    <!-- MODALE -->
  <transition name="fade">
  <div class="modale-backdrop" v-if="showModal" @close="showModal = false">
    <div class="modale">
      <h1>Charts of stats</h1>
      <Temperature class="chart" :width="200" height="250"></Temperature>
      <Brightness class="chart" :width="200" height="250"></Brightness>
      <Humidity class="chart" :width="200" height="250"></Humidity>
      <Pollution class="chart" :width="200" height="250"></Pollution>
      <button type="button" class="close" @click="showModal = false">X</button>
    </div>
  </div>
  </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Temperature from '@/components/Charts/Temperature.js'
import Brightness from '@/components/Charts/Brightness.js'
import Humidity from '@/components/Charts/Humidity.js'
import Pollution from '@/components/Charts/Pollution.js'

export default {
	name: 'StatsWorlds',
  components: {
    Temperature,
    Brightness,
    Humidity,
    Pollution
  },
	data () {
      return {
        worldsInfos: null,
        showModal: false
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
  },
  methods: {
    onShowModal: function () {
      this.showModal = true
    }
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

  #show-modal{
    margin-top 10px
    background-color green
    color #fff
    border none
    border-radius 10px
    padding 10px 30px
    font-size 1em
  }

  #show-modal:hover{
    background-color #fff
    color green
    cursor pointer
  }

  .modale-backdrop{
    position: fixed
    top 0
    bottom 0
    left 0
    right 0
    background-color rgba(0, 0, 0, 0.5)
    display flex
    justify-content center
    align-items center
  }

  .modale{
    position relative
    width 90%
    height 80%
    background-color #fff
    overflow-y auto
    color #000
    text-align center
  }

  .modale h1{
    margin-top 20px
    text-align center
    margin-bottom 10px
  }

  .modale .close{
    font-size 1em
    position absolute
    top 0
    right 0
    border none
    padding 10px 15px
    cursor pointer
    background-color green
    color #fff
  }

  .modale .close:hover{
    background-color red
  }

  .chart{
    display inline-block
    width 45%
  }

  .chart:first-child, .chart:nth-child(3) {
    margin-right 2%
  }

  .chart:last-child, .chart:nth-child(2) {
    margin-left 2%
  }

  .fade-enter-active, .fade-leave-active {
    transition-property opacity
    transition-duration 0.25s
  }

  .fade-enter-active {
    transition-delay 0.25s
  }

  .fade-enter, .fade-leave-active {
    opacity 0
  }
</style>
