<template>
  <div id="container">
    <span class="title">Environment</span>
    <div id="sliders-container">
      <div class="slidecontainer">
        <div class="value-container">
          <span class="infos">Temperature </span><span class="slider-value" id="temperature-slider-value">50</span>
        </div>
        <input type="range" min="1" max="100" value="50" class="slider" id="temperature-slider" v-on:input="change">
      </div>
      <div class="slidecontainer">
        <div class="value-container">
          <span class="infos">Brightness</span> <span class="slider-value" id="brightness-slider-value">50</span>
        </div>
        <input type="range" min="1" max="100" value="50" class="slider" id="brightness-slider" v-on:input="change">
      </div>
      <div class="slidecontainer">
        <div class="value-container">
          <span class="infos">Humidity </span><span class="slider-value" id="humidity-slider-value">50</span>
        </div>
        <input type="range" min="1" max="100" value="50" class="slider" id="humidity-slider" v-on:input="change">
      </div>
      <div class="slidecontainer">
        <div class="value-container">
          <span class="infos">Pollution </span><span class="slider-value" id="pollution-slider-value">50</span>
        </div>
        <input type="range" min="1" max="100" value="50" class="slider" id="pollution-slider" v-on:input="change">
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
    top 50px
    right 30px
    font-size 20px
    background-color #212121
    // border solid 2px #d1ccc0
    padding 20px
    border-radius 20px
    color #F9F9F9
    .title
      font-weight bold
    #sliders-container
      left 20px
      display flex
      flex-direction column
      width 200px
      font-size 0.8em
      .value-container
        display flex
        justify-content space-between
      .slidecontainer
        margin 10px 0
      .slider-value
        // border solid 2px green
      .infos
        display inline-block
        text-align left
        margin 0

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

  // Sliders
  input[type=range]
      -webkit-appearance: none /* Hides the slider so that custom slider can be made */
      width: 100% /* Specific width is required for Firefox. */
      background: transparent /* Otherwise white in Chrome */
    input[type=range]
      &:focus
        outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
    input[type=range]
      &::-ms-track
        width: 100%;
        cursor: pointer
        /* Hides the slider so custom styles can be added */
        background: transparent
        border-color: transparent
        color: transparent
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 23px;
    width: 23px;
    border-color: #099622;
    border-radius: 20px;
    background: #099622;
    cursor: pointer;
    margin-top: -8px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
    box-shadow: 0px 0px 1px #0d0d0d; /* Add cool effects to your sliders! */
  } 
  input[type=range]::-webkit-slider-runnable-track {
    width 100%
    height 8.4px
    cursor pointer
    box-shadow 1px 1px 1px #000000, 0px 0px 1px #0d0d0d
    background #424242
    border-radius 20px
    border 0.2px solid #010101
  }
  input[type=range]::-moz-range-thumb {
    height 23px
    width 23px
    border-color #099622
    border-radius 20px
    background #099622
    cursor pointer
    margin-top -8px /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
    box-shadow 0px 0px 1px #0d0d0d /* Add cool effects to your sliders! */
  } 
  input[type=range]::-moz-range-track {
    width 100%
    height 8.4px
    cursor pointer
    box-shadow 1px 1px 1px #000000, 0px 0px 1px #0d0d0d
    background #424242
    border-radius 20px
    border 0.2px solid #010101
  }
        
</style>
