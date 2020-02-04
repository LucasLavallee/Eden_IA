<template>
  <div class="time-container">
	<span> <b>Timer</b>: {{this.time}}</span>
	<button class="button" v-on:click="setSpeed"><span>x1</span></button>
	<button class="button" v-on:click="setSpeed"><span>x2</span></button>
	<button class="button" v-on:click="setSpeed"><span>x5</span></button>
	<button class="button" v-on:click="setSpeed"><span>x10</span></button>
  </div>
</template>

<script>

import TimeManager from '../../webgl/controls/TimeManager'
import { mapGetters, mapActions } from 'vuex'
import store from '@/store'

export default {
  name: 'Time',
  data () {
    return {
      time: '',
      speed: 1000,
      timerId: 0
    }
  },
  methods: {
	...mapActions([
    	'changeCurrentSpeed'
	]),
	computed: {
    	...mapGetters([
      		'getCurrentSpeed'
    	])
  	},
    setSpeed (el) {
      const speedText = el.target.innerText
      switch (speedText) {
        case 'x1':
		  this.speed = 1000
		  store.dispatch('changeCurrentSpeed', 1)
          break
        case 'x2':
		  this.speed = 500
		  store.dispatch('changeCurrentSpeed', 2)
          break
        case 'x10':
		  this.speed = 100
		  store.dispatch('changeCurrentSpeed', 10)
          break
        default:
          break
      }
      this.timeManager.setSpeed(this.speed)
      this.timeManager.changeSpeed()
      clearInterval(this.timerId)
      this.timerId = setInterval(() => {
        this.time = this.timeManager.print()
      }, this.speed)
    }
  },
  mounted () {
    this.timeManager = new TimeManager()
    this.timerId = setInterval(() => {
      this.time = this.timeManager.print()
    },this.speed)
  }
}

</script>
<style scoped>
.time-container {
	position: absolute;
	bottom: 50px;
	left: 50px;
}
.button {
	border: solid 2px red
}
</style>
