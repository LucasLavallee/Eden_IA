<template>
  <div class="statsWorld">
    <p>Stats</p>
    <ul>
      <li>Present species : {{ getNumberOfPresentSpecies }}</li>
      <li>Planted individual : {{ getNumberOfPlanted }}</li>
      <li>Born naturally : {{ getNumberOfBornNaturally }}</li>
      <li>Dead : {{ getNumberOfDead }}</li>
      <button type="button" id="show-modal" @click="onShowModal()">See more</button>
    </ul>

    <!-- MODALE -->
  <transition name="fade">
  <div class="modale-backdrop" v-if="showModal" @close="showModal = false">
    <div class="modale">
      <h1>Charts of stats</h1>
      <PresentSpeciesChart/>
      <PlantedChart/>
      <BornChart/>
      <DeadChart/>
      <!--<Dead class="chart" :width="200" :height="250" :chart-data="chartDead"></Dead>-->
      <button type="button" class="close" @click="showModal = false">X</button>
    </div>
  </div>
  </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '@/store'

// import PresentSpecies from '@/components/Charts/PresentSpecies.js'
import PresentSpeciesChart from '@/components/Charts/PresentSpecies.vue'
import DeadChart from '@/components/Charts/Dead.vue'
import PlantedChart from '@/components/Charts/PlantedIndividual.vue'
import BornChart from '@/components/Charts/BornNaturally.vue'

export default {
	name: 'StatsWorlds',
  components: {
    PresentSpeciesChart,
    DeadChart,
    PlantedChart,
    BornChart
  },
	data () {
      return {
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
      'getCurrentTime'
    ])
  },
  methods: {
    onShowModal: function () {
      this.showModal = true
    }
  }/* ,
  mounted() {
    setInterval(this.generateData, 2000)
  } */
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
    width 40%
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

  @media screen and (max-width: 1024px){
    .chart{
      display block
      width 90%
      margin 0 auto
    }

    .chart:first-child, .chart:nth-child(3) {
      margin-right auto
    }

    .chart:last-child, .chart:nth-child(2) {
      margin-left auto
    }
  }
</style>
