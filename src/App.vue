<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/edenIA">Eden IA</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="stylus">
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    height 100%

  #nav
    position fixed
    top 20px
    left 50%
    z-index 1
    transform translateX(-50%)

  html, body
    padding 0px
    margin 0px
    font-family arial
    width 100%
    height 100%
</style>
