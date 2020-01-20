<template>
    <div id="modeSelection">
        <div class="mode" :class="getCurrentMode === 'navigate' ? 'active': ''" @click="changeCurrentMode('navigate')">
            <p>Navigate</p>
        </div>
        <div class="mode" :class="getCurrentMode === 'add' ? 'active': ''" @click="changeCurrentMode('add')">
            <p>Add</p>
        </div>
        <div v-if="getCurrentMode === 'add'" class="items-container">
              <div class="item" id="carot" :class="getCurrentSelection === 'carot' ? 'active': ''" @click="changeCurrentSelection('carot')"> Carot </div>
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
        <div class="mode" :class="getCurrentMode === 'remove' ? 'active': ''" @click="changeCurrentMode('remove')">
            <p>Remove</p>
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

<style lang="stylus">
    #modeSelection
      position fixed
      width 20%
      top 20px
      left 20px
      display flex
      flex-direction column

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
      flex-wrap wrap
      justify-content center

      .item
        background-color #fff
        margin 10px
        padding 10px 30px
        cursor pointer
        border-radius 8px

        &.active
          background-color blue
          color #fff
</style>
