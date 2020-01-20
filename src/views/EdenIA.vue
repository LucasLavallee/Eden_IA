<template>
  <div class="edenIA">
    <canvas class="BackgroundGL" ref="canvas">
      fallback
    </canvas>
    <ModeSelection/>
    <MiniWorldInfos/>
  </div>
</template>

<script>

import Webgl from '../webgl/Webgl'
import loop from 'raf-loop'
import ModeSelection from '../components/UI/ModeSelection'
import MiniWorldInfos from '../components/UI/MiniWorldInfos'

export default {
  name: 'EdenIA',
  components: {
    ModeSelection,
    MiniWorldInfos
  },
  data () {
    return {
      engine: undefined
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
  .edenIA
    width 100%
    height 100%
    position absolute
    top 0
    left 0

</style>
