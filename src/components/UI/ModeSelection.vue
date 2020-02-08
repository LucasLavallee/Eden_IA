<template>
  <div id="container">
    <div id="modeSelection">
        <div class="mode" :class="getCurrentMode === 'navigate' ? 'active': ''" @click="changeCurrentMode('navigate')">
            <font-awesome-icon class="icon" :icon="['fas','arrows-alt']" size="2x" />
        </div>
        <div class="mode" :class="getCurrentMode === 'remove' ? 'active': ''" @click="changeCurrentMode('remove')">
            <font-awesome-icon :icon="['fas','trash-alt']" size="2x" />
        </div>
        <div class="mode" :class="getCurrentMode === 'add' ? 'active': ''" @click="changeCurrentMode('add')">
            <font-awesome-icon :icon="['fas','plus-circle']" size="2x" />
        </div>
    </div>
    <div v-if="getCurrentMode === 'add'" class="items-container">
      <div class="item" id="carrot" :class="getCurrentSelection === 'carrot' ? 'active': ''" @click="changeCurrentSelection('carrot')">
        <img class="icon-item" :src="carrot"/>
      </div>
      <div class="item" id="beet" :class="getCurrentSelection === 'beet' ? 'active': ''" @click="changeCurrentSelection('beet')">
        <img class="icon-item" :src="beet"/>
      </div>
      <div class="item" id="pepper" :class="getCurrentSelection === 'pepper' ? 'active': ''" @click="changeCurrentSelection('pepper')">
        <img class="icon-item" :src="pepper"/>
      </div>
      <div class="item" id="pumpkin" :class="getCurrentSelection === 'pumpkin' ? 'active': ''" @click="changeCurrentSelection('pumpkin')">
        <img class="icon-item" :src="pumpkin"/>
      </div>
      <div class="item" id="zucchini" :class="getCurrentSelection === 'zucchini' ? 'active': ''" @click="changeCurrentSelection('zucchini')">
        <img class="icon-item" :src="zucchini"/>
      </div>
      <div class="item" id="banana" :class="getCurrentSelection === 'banana' ? 'active': ''" @click="changeCurrentSelection('banana')">
        <img class="icon-item" :src="banana"/>
      </div>
      <div class="item" id="pear" :class="getCurrentSelection === 'pear' ? 'active': ''" @click="changeCurrentSelection('pear')">
        <img class="icon-item" :src="pear"/>
      </div>
      <div class="item" id="tomato" :class="getCurrentSelection === 'tomato' ? 'active': ''" @click="changeCurrentSelection('tomato')">
        <img class="icon-item" :src="tomato"/>
      </div>
      <div class="item" id="strawberry" :class="getCurrentSelection === 'strawberry' ? 'active': ''" @click="changeCurrentSelection('strawberry')">
        <img class="icon-item" :src="strawberry"/>
      </div>
      <div class="item" id="orange" :class="getCurrentSelection === 'orange' ? 'active': ''" @click="changeCurrentSelection('orange')">
        <img class="icon-item" :src="orange"/>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import carrot from '../../../public/Icons/carrot.png'
import banana from '../../../public/Icons/banana.png'
import beet from '../../../public/Icons/beet.png'
import orange from '../../../public/Icons/orange.png'
import pear from '../../../public/Icons/pear.png'
import pepper from '../../../public/Icons/pepper.png'
import pumpkin from '../../../public/Icons/pumpkin.png'
import strawberry from '../../../public/Icons/strawberry.png'
import tomato from '../../../public/Icons/tomato.png'
import zucchini from '../../../public/Icons/zucchini.png'
export default {
  name: 'ModeSelection',
  data () {
    return {
      currentMode: this.getCurrentMode,
      carrot: carrot,
      beet: beet,
      banana: banana,
      orange: orange,
      pear: pear,
      pepper: pepper,
      pumpkin: pumpkin,
      strawberry: strawberry,
      tomato: tomato,
      zucchini: zucchini,
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
      border-radius 0px
    .mode
      margin 5px 0
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
        color #099622
        box-shadow 1px 1px 1px #000000, 0px 0px 1px #0d0d0d
      &:hover
        box-shadow 0px 0px 0px #000000, 0px 0px 0px #0d0d0d

    .items-container
      display flex
      flex-direction row
      border solid 2px #212121
      background-color #212121
      border-radius 20px
      justify-content center
      flex-wrap wrap
      width 400px
      padding 20px

      .item
        // background-color #fff
        margin 10px
        padding 10px
        cursor pointer
        border-radius 50%
        display flex
        justify-content center
        align-items center
        width 40px
        height 40px
        text-align center
        &:hover
          box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
          background-color #313131
        &.active
          box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
          background-color #313131
          color #fff
        .icon-item {
          width 30px
          height 30px
        }

</style>
