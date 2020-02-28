<template>
    <div id="worldSelection" v-on:mouseover="previousMode=getCurrentMode;changeCurrentMode('Worlds')" v-on:mouseout="changeCurrentMode(previousMode)">
        <div id="miniWorldSelection">
            <div id="globalView" class="worldChange" :class=" getActiveWorld === 0 ? 'active' : ''" @click="changeActiveWorld(0)"><p>Global view</p></div>
            <div class="worldChange" :class="getActiveWorld === 1 ? 'active': ''" @click="changeActiveWorld(1)"><p>1</p></div>
            <div class="worldChange" :class="getActiveWorld === 2 ? 'active': ''" @click="changeActiveWorld(2)"><p>2</p></div>
            <div class="worldChange" :class="getActiveWorld === 3 ? 'active': ''" @click="changeActiveWorld(3)"><p>3</p></div>
            <div class="worldChange" :class="getActiveWorld === 4 ? 'active': ''" @click="changeActiveWorld(4)"><p>4</p></div>
            <div class="worldChange" :class="getActiveWorld === 5 ? 'active': ''" @click="changeActiveWorld(5)"><p>5</p></div>
            <div class="worldChange" :class="getActiveWorld === 6 ? 'active': ''" @click="changeActiveWorld(6)"><p>6</p></div>
        </div>
        
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'WorldChange',
  data () {
    return {
      currentMode: this.getCurrentMode,
      previousMode: this.currentMode
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters([
      'getActiveWorld',
      'getCurrentMode'
    ])
  },
  methods: {
    ...mapActions([
      'changeActiveWorld',
      'changeCurrentMode',
    ])
  }
}
</script>

<style lang="stylus">
    #worldSelection
        position fixed
        left 50%
        bottom 20px
        margin-top 5px
        transform translate3d(-50%,0,0)
        display flex
        flex-direction column
        cursor default
        .worldChange
            border 2px solid #000
            padding 10px 15px
            margin 0 5px
            background-color #F9F9FF
            border-radius 10px
            font-weight bold
            box-shadow 1px 1px 1px #000000, 0px 0px 1px #0d0d0d
            p 
                margin 0
            &:hover
                box-shadow 0px 0px 0px #000000, 0px 0px 0px #0d0d0d
            &.active
                background-color #212121
                box-shadow 0px 0px 0px #000000, 0px 0px 0px #0d0d0d
                color #099622
    #miniWorldSelection
        display flex
    #globalView
        margin-top 5px
        border 2px solid #000
        &.active
            background-color #fff
</style>