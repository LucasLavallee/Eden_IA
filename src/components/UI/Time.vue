<template>
  <div class="time-container">
	<div class="time-value-container">
		<span> <b>Timer</b>: {{this.time}}</span>
	</div>
	<div class="button-container">
		<button class="button" :class="currentSpeed === 1 ? 'active': ''" v-on:click="setSpeed"><span>x1</span></button>
		<button class="button" :class="currentSpeed === 2 ? 'active': ''" v-on:click="setSpeed"><span>x2</span></button>
		<button class="button" :class="currentSpeed === 10 ? 'active': ''" v-on:click="setSpeed"><span>x10</span></button>
		<button class="button" :class="currentSpeed === 100 ? 'active': ''" v-on:click="setSpeed"><span>x100</span></button>
	</div>
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
	  timerId: 0,
	  currentSpeed: 1
    }
  },
	methods: {
		...mapActions([
			'changeCurrentSpeed'
		]),
		setSpeed (el) {
			const speedText = el.target.innerText
			switch (speedText) {
				case 'x1':
					this.speed = 1000
					store.dispatch('changeCurrentSpeed', 1)
					this.currentSpeed = 1
					break
				case 'x2':
					this.speed = 500
					store.dispatch('changeCurrentSpeed', 2)
					this.currentSpeed = 2
					break
				case 'x10':
					this.speed = 100
					store.dispatch('changeCurrentSpeed', 10)
					this.currentSpeed = 10
					break
				case 'x100':
					this.speed = 1
					store.dispatch('changeCurrentSpeed', 100)
					this.currentSpeed = 100
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
		},
	},
    computed: {
    	...mapGetters([
      		'getCurrentSpeed'
    	])
	},
    
  	mounted () {
    this.timeManager = new TimeManager()
    this.timerId = setInterval(() => {
      this.time = this.timeManager.print()
    }, this.speed)
  }
}

</script>
<style scoped>
.time-container {
	position: absolute;
	bottom: 50px;
	left: 50px;
	display: flex;
	flex-direction: column;
}
.button {
	border: solid 2px #212121
}
.button:focus {
	outline: none;
}
.button:hover {
	cursor: pointer;
}
.active {
	background-color: #212121;
	color: white;
}
</style>
