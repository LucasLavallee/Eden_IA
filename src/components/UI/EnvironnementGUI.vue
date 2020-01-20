<template>
  <div id="container">
    <span>Tools</span>
    <div id="modeSelection">
        <div class="mode" :class="getCurrentMode === 'navigate' ? 'active': ''" @click="changeCurrentMode('navigate')">
            <p>Navigate</p>
        </div>
        <div class="mode" :class="getCurrentMode === 'add' ? 'active': ''" @click="changeCurrentMode('add')">
            <p>Add</p>
        </div>
        <div class="mode" :class="getCurrentMode === 'remove' ? 'active': ''" @click="changeCurrentMode('remove')">
            <p>Remove</p>
        </div>
        <!-- <transition
          name="fade"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:after-enter="afterEnter"
          v-on:enter-cancelled="enterCancelled"

          v-on:before-leave="beforeLeave"
          v-on:leave="leave"
          v-on:after-leave="afterLeave"
          v-on:leave-cancelled="leaveCancelled"
        > -->
          <div v-if="getCurrentMode === 'add'" class="items-container">
            <div class="item" id="carot" :class="getCurrentSelection === 'carot' ? 'active': ''" @click="changeCurrentSelection('carot')"> C </div>
            <div class="item" id="banana" :class="getCurrentSelection === 'banana' ? 'active': ''" @click="changeCurrentSelection('banana')"> B </div>
            <div class="item" id="pear" :class="getCurrentSelection === 'pear' ? 'active': ''" @click="changeCurrentSelection('pear')"> P </div>
            <div class="item" id="tomato" :class="getCurrentSelection === 'tomato' ? 'active': ''" @click="changeCurrentSelection('tomato')"> T </div>
            <div class="item"> XX </div>
            <div class="item"> XX </div>
            <div class="item"> XX </div>
            <div class="item"> XX </div>
          </div>
        <!-- </transition> -->
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'EnvironnementGui',
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
    position fixed
    top 20px
    right 20px
    font-size 20px
    #modeSelection
      left 20px
      display flex
      flex-direction column
      width 200px
      font-size 0.8em

    .mode
      margin 5px 0
      background-color #fff
      padding 5px
      cursor pointer

      &.active
        background-color red

    .items-container
      display flex
      flex-direction row
      border solid 2px yellow
      justify-content center
      margin-top 20px
      flex-wrap wrap

      .item
        background-color #fff
        margin 10px
        padding 5px
        cursor pointer
        width 20px
        height 20px

        &.active
          background-color blue

</style>
