<template>
  <div class="edenIA">
    <canvas class="BackgroundGL" ref="canvas">
      fallback
    </canvas>
    <ModeSelection/>
    <!--<MiniWorldInfos/>-->
    <EnvironnementGui/>
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

export default {
  name: 'EdenIA',
  components: {
    ModeSelection,
    EnvironnementGui,
    Time,
    Information
  },
  data () {
    return {
      engine: undefined,
      textShow: true
    }
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
    }
  }
}
</script>

<style lang="stylus">
  a
    &:visited
      color #212121
  .edenIA
    width 100%
    height 100%
    position absolute
    top 0
    left 0
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
