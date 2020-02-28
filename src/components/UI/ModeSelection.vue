<template>
  <div id="container">
    <div id="modeSelection">
        <div class="mode" :class="getCurrentMode === 'navigate' ? 'active': ''" @click="clickHandle('navigate')">
            <font-awesome-icon class="icon" :icon="['fas','arrows-alt']" size="2x" />
        </div>
        <div class="mode" :class="getCurrentMode === 'remove' ? 'active': ''" @click="clickHandle('remove')">
            <font-awesome-icon :icon="['fas','trash-alt']" size="2x" />
        </div>
        <div class="mode" v-on:mouseover="mouseOverHandle" v-on:mouseout="mouseOutHandle" :class="getCurrentMode === 'add' ? 'active': ''">
            <font-awesome-icon :icon="['fas','plus-circle']" size="2x" />
        </div>
    </div>
    <transition name="fade">
    <div v-if="pannelShow" v-on:mouseout="mouseOutHandle" class="items-container">
      <div class="type-items">
        <span class="type-item" :class="modeSpecie==='fruits' ? 'active': ''" @click="modeSpecie='fruits'" >Fruits</span>
        <span class="type-item" :class="modeSpecie==='vegetables' ? 'active': ''" @click="modeSpecie='vegetables'">Légumes</span>
      </div>
      <div class="items">
        <div class="items-fruits" v-if="modeSpecie==='fruits'">
          <div v-on:mouseover="mouseOverHandle" class="item" id="banana" :class="getCurrentSelection === 'banana' ? 'active': ''" @click="changeCurrentSelection('banana')">
            <img class="icon-item" :src="banana"/>
          </div>
          <div v-on:mouseover="mouseOverHandle" class="item" id="pear" :class="getCurrentSelection === 'pear' ? 'active': ''" @click="changeCurrentSelection('pear')">
            <img class="icon-item" :src="pear"/>
          </div>
          <div v-on:mouseover="mouseOverHandle" class="item" id="tomato" :class="getCurrentSelection === 'tomato' ? 'active': ''" @click="changeCurrentSelection('tomato')">
            <img class="icon-item" :src="tomato"/>
          </div>
          <div v-on:mouseover="mouseOverHandle" class="item" id="strawberry" :class="getCurrentSelection === 'strawberry' ? 'active': ''" @click="changeCurrentSelection('strawberry')">
            <img class="icon-item" :src="strawberry"/>
          </div>
          <div v-on:mouseover="mouseOverHandle" class="item" id="orange" :class="getCurrentSelection === 'orange' ? 'active': ''" @click="changeCurrentSelection('orange')">
            <img class="icon-item" :src="orange"/>
          </div>
        </div>
        <div class="items-vegetables" v-if="modeSpecie==='vegetables'">
          <div v-on:mouseover="mouseOverHandle" class="item" id="carrot" :class="getCurrentSelection === 'carrot' ? 'active': ''" @click="changeCurrentSelection('carrot')">
            <img class="icon-item" :src="carrot"/>
          </div>
          <div v-on:mouseover="mouseOverHandle" class="item" id="beet" :class="getCurrentSelection === 'beet' ? 'active': ''" @click="changeCurrentSelection('beet')">
            <img class="icon-item" :src="beet"/>
          </div>
          <div v-on:mouseover="mouseOverHandle" class="item" id="pepper" :class="getCurrentSelection === 'pepper' ? 'active': ''" @click="changeCurrentSelection('pepper')">
            <img class="icon-item" :src="pepper"/>
          </div>
          <div v-on:mouseover="mouseOverHandle" class="item" id="pumpkin" :class="getCurrentSelection === 'pumpkin' ? 'active': ''" @click="changeCurrentSelection('pumpkin')">
            <img class="icon-item" :src="pumpkin"/>
          </div>
          <div v-on:mouseover="mouseOverHandle" class="item" id="zucchini" :class="getCurrentSelection === 'zucchini' ? 'active': ''" @click="changeCurrentSelection('zucchini')">
            <img class="icon-item" :src="zucchini"/>
          </div>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import carrot from '../../../public/Icons/carrot.svg'
import banana from '../../../public/Icons/banana.svg'
import beet from '../../../public/Icons/beet.svg'
import orange from '../../../public/Icons/orange.svg'
import pear from '../../../public/Icons/pear.svg'
import pepper from '../../../public/Icons/pepper.svg'
import pumpkin from '../../../public/Icons/pumpkin.svg'
import strawberry from '../../../public/Icons/strawberry.svg'
import tomato from '../../../public/Icons/tomato.svg'
import zucchini from '../../../public/Icons/zucchini.svg'
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
      pannelShow: false,
      timerPannel: null,
      modeSpecie: ''
    }
  },

  mounted () {
    this.modeSpecie = 'fruits'
  },

  methods: {
    ...mapActions([
      'changeCurrentMode',
      'changeCurrentSelection'
    ]),
    mouseOverHandle () {
      this.pannelShow = true
      if (this.timerPannel !== null) {
        clearInterval(this.timerPannel)
      }
      this.timerPannel = setTimeout(() => { this.pannelShow = false }, 1500)
      this.changeCurrentMode('add')
    },
    mouseOutHandle () {
      if (this.timerPannel !== null) {
        clearInterval(this.timerPannel)
      }
      this.timerPannel = setTimeout(() => { this.pannelShow = false }, 1500)
    },
    clickHandle (mode) {
      this.changeCurrentMode(mode)
      if (this.timerPannel !== null) {
        clearInterval(this.timerPannel)
      }
      this.pannelShow = false
    }
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
    top 50px
    left 50px
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
      background-color #F9F9FF
      &.active
        background-color #212121
        color #099622
        box-shadow 0px 0px 0px #000000, 0px 0px 0px #0d0d0d
      &:hover
        box-shadow 0px 0px 0px #000000, 0px 0px 0px #0d0d0d

    .items-container
      display flex
      flex-direction column
      border solid 2px #212121
      background-color #212121
      border-radius 20px
      justify-content center
      flex-wrap wrap
      width 400px
      padding 20px
      .type-items
        // border solid 3px red
        display flex
        justify-content space-around
        padding 0 20px 
        .type-item
          color #F9F9F9
          margin 0 10px
          padding 10px 20px
          border-radius 20px
          &:hover
            box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5)
          &.active
            box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5)
      .items 
        display flex
        flex-direction row
        flex-wrap wrap
        .items-fruits
        .items-vegetables
          display flex
          flex-direction row
          flex-wrap wrap
      .item
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

  // Animation handler

  .fade-enter-active {
    transition: opacity  .2s ease-out, transform .5s cubic-bezier(.22,1.07,.57,1.42)
  }

   .fade-leave-active {
     transition: opacity .2s ease-in, transform .3s ease-in
   }

  .fade-enter, .fade-leave-to {
    transform: translateY(-20px)
    opacity: 0
  }

</style>
