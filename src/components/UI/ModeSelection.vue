<template>
  <div id="container">
    <!-- <span>Tools</span> -->
    <div id="modeSelection">
        <div class="mode" :class="getCurrentMode === 'navigate' ? 'active': ''" @click="changeCurrentMode('navigate')">
            <font-awesome-icon class="icon" :icon="['fas','arrows-alt']" size="2x" />
        </div>
        <div class="mode" :class="getCurrentMode === 'add' ? 'active': ''" @click="changeCurrentMode('add')">
            <font-awesome-icon :icon="['fas','plus-circle']" size="2x" />
        </div>
        <div class="mode" :class="getCurrentMode === 'remove' ? 'active': ''" @click="changeCurrentMode('remove')">
            <font-awesome-icon :icon="['fas','trash-alt']" size="2x" />
        </div>
    </div>
    <div v-if="getCurrentMode === 'add'" class="items-container">
      <div class="item" id="carot" :class="getCurrentSelection === 'carot' ? 'active': ''" @click="changeCurrentSelection('carot')">
        <font-awesome-icon :icon="['fas','carrot']" size="2x"/>
      </div>
      <div class="item" id="beet" :class="getCurrentSelection === 'beet' ? 'active': ''" @click="changeCurrentSelection('beet')"> Beet </div>
      <div class="item" id="pepper" :class="getCurrentSelection === 'pepper' ? 'active': ''" @click="changeCurrentSelection('pepper')"> Pepper </div>
      <div class="item" id="pumpkin" :class="getCurrentSelection === 'pumpkin' ? 'active': ''" @click="changeCurrentSelection('pumpkin')"> Pumpkin </div>
      <div class="item" id="zucchini" :class="getCurrentSelection === 'zucchini' ? 'active': ''" @click="changeCurrentSelection('zucchini')"> Zucchini </div>
      <div class="item" id="banana" :class="getCurrentSelection === 'banana' ? 'active': ''" @click="changeCurrentSelection('banana')"> Banana </div>
      <div class="item" id="pear" :class="getCurrentSelection === 'pear' ? 'active': ''" @click="changeCurrentSelection('pear')"> Pear </div>
      <div class="item" id="tomato" :class="getCurrentSelection === 'tomato' ? 'active': ''" @click="changeCurrentSelection('tomato')"> Tomato </div>
      <div class="item" id="strawberry" :class="getCurrentSelection === 'strawberry' ? 'active': ''" @click="changeCurrentSelection('strawberry')"> Strawberry </div>
      <div class="item" id="orange" :class="getCurrentSelection === 'orange' ? 'active': ''" @click="changeCurrentSelection('orange')"> Orange </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ModeSelection',
  data () {
    return {
      currendMode: this.getCurrentMode
    }
  },
  methods: {
    ...mapActions([
      'changeCurrentMode',
      'changeCurrentSelection'
    ])
  },
  computed: {
    ...mapGetters([
      'getCurrentMode',
      'getCurrentSelection'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  #container
    // border solid 2px black
    position fixed
    top 20px
    // bottom 50%
    left 20px
    font-size 20px
    display flex
    justify-content flex-start
    flex-direction column
    #modeSelection
      display flex
      flex-direction column
      font-size 0.6em
      margin-bottom 20px
      // background-color #27ae60
      border-radius 0px
      // padding 10px
    .mode
      margin 5px 0
      // background-color #27ae60
      border solid 2px #212121
      border-radius 20px
      padding 5px
      cursor pointer
      width 50px
      height 50px
      display flex
      justify-content center
      align-items center
      color #212121
      box-shadow 1px 1px 1px #000000, 0px 0px 1px #0d0d0d
      &.active
        background-color #212121
        pointer-events none
        color #F9F9F9
        box-shadow 1px 1px 1px #000000, 0px 0px 1px #0d0d0d
      &:hover
        // background-color #27ae60
        // border solid 3px #34495e
        // margin-left 10px
        box-shadow 0px 0px 0px #000000, 0px 0px 0px #0d0d0d

    .items-container
      display flex
      flex-direction row
      border solid 2px #825a2c
      border-radius 20px
      justify-content center
      flex-wrap wrap
      width 400px
      // background-color #825a2c

      .item
        background-color #fff
        margin 10px
        padding 10px
        cursor pointer
        border-radius 50%
        width 40px
        height 40px
        text-align center
        &.active
          background-color blue
          color #fff

</style>
