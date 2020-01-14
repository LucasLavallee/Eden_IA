<template>
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
      'changeCurrentMode'
    ])
  },
  computed: {
    ...mapGetters([
      'getCurrentMode'
    ])
  }
}
</script>

<style lang="stylus">
    #modeSelection
        position fixed
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
</style>
