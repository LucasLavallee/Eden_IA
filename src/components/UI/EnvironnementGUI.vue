<template>
  <div id="container">
    <span>Environment properties</span>
    <div id="sliders-container">
      <div class="slidecontainer">
        <p class="infos">Temperature</p>
        <input type="range" min="1" max="100" value="50" class="slider" id="temperature-slider" v-on:input="change"><span id="temperature-slider-value">50</span>
      </div>
      <div class="slidecontainer">
        <p class="infos">Brightness</p>
        <input type="range" min="1" max="100" value="50" class="slider" id="brightness-slider" v-on:input="change"><span id="brightness-slider-value">50</span>
      </div>
      <div class="slidecontainer">
        <p class="infos">Humidity</p>
        <input type="range" min="1" max="100" value="50" class="slider" id="humidity-slider" v-on:input="change"><span id="humidity-slider-value">50</span>
      </div>
      <div class="slidecontainer">
        <p class="infos">Pollution</p>
        <input type="range" min="1" max="100" value="50" class="slider" id="pollution-slider" v-on:input="change"><span id="pollution-slider-value">50</span>
      </div>
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
    ]),
    change (e) {
      console.log(e.target.id)
      console.log(e.target.value)
      const spanId = e.target.id + '-value'
      document.getElementById(spanId).innerText = e.target.value
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
    top 20px
    right 20px
    font-size 20px
    background-color #d1ccc0
    padding 20px
    border-radius 20px
    #sliders-container
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
