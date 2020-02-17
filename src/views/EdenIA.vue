<template>
  <div class="edenIA">
    <img v-if="getCurrentMode == 'add'" class="cursor-image" id="cursor-image-add" :src="mouseAdd"/>
    <img v-if="getCurrentMode == 'navigate'" class="cursor-image" id="cursor-image-navigate" :src="mouseNavigate"/>
    <canvas class="BackgroundGL" ref="canvas">
      fallback
    </canvas>
    <ModeSelection/>
    <MiniWorldInfos/>
    <EnvironnementGui/>
    <StatsWorlds/>
    <Time/>
    <Information/>
    <router-link to="/">
      <div class="home-button">
        <div class="item icon">
            <font-awesome-icon id="icon-home" :icon="['fas','home']" size="1x" />
        </div>
        <div class="item text">
          <span id="text-info" v-if="textShow">Back home</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>

import Webgl from '../webgl/Webgl'
import loop from 'raf-loop'
import ModeSelection from '../components/UI/ModeSelection'
import EnvironnementGui from '../components/UI/EnvironnementGUI'
import Information from '../components/UI/Informations'
import Time from '../components/UI/Time'
import MiniWorldInfos from '../components/UI/MiniWorldInfos'
import mouseAdd from '../../public/Icons/mouse_add.png'
import mouseNavigate from '../../public/Icons/mouse_navigate.png'
import { mapGetters } from 'vuex'
import StatsWorlds from '@/components/UI/StatsWorlds'

export default {
  name: 'EdenIA',
  components: {
    ModeSelection,
    EnvironnementGui,
    Time,
    Information,
    MiniWorldInfos,
    StatsWorlds
  },
  data () {
    return {
      engine: undefined,
      textShow: true,
      mouseAdd: mouseAdd,
      mouseNavigate: mouseNavigate
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentMode'
    ])
  },
  mounted () {
    this.webgl = new Webgl(this.$refs['canvas'])
    this.engine = loop(this.webgl.render)
    this.engine.start()
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy () {
    this.webgl.destroy()
    this.engine.stop()
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize () {
      this.webgl.onResize()
    },
    setCursor () {
      const currentMode = this.getCurrentMode
      switch (currentMode) {
        case 'add':
          return mouseAdd
        case 'navigate':
          return mouseNavigate
        default:
          break
      }
    }
  }
}
</script>

<style lang="stylus">
  .cursor-image
    position absolute
    left 50px
    top 50px
    width 30px
    pointer-events none
    z-index 1000
  .BackgroundGL
    cursor none
  a
    &:visited
      color #212121
  .edenIA
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    cursor none
  .home-button
    position absolute
    bottom 50px
    right 80px
    display flex
    flex-direction row
    justify-content center
    align-items center
    .item
      margin 0 5px
    .icon
      background-color #212121
      padding 5px
      border-radius 50%
      width 22px
    #icon-home
      color white
    #text-info
      &:hover
        text-decoration underline

</style>
