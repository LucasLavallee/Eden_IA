<template>
  <div class="container">
	  <div class="container-mode">
		  <span class="info-mode">{{getCurrentMode}}</span><br/>
	  </div>
	  <div class="container-species">
		  <span class="info-species" v-if="getCurrentMode==='add'">{{getCurrentSelection}}</span>
	  </div>
  </div>
  
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
	name: "Informations",
	computed: {
    	...mapGetters([
      	'getCurrentMode',
      	'getCurrentSelection'
		])
	},
}
</script>

<style lang="stylus" scoped>
	.container
		position fixed
		width 100px
		margin-left -50px
		top 0
		left 50%
		.container-mode
			border-radius 30px
			background-color #212121
			color #F9F9F9
			padding 10px
			margin-top 30px
			font-weight bold
			.info-mode
				text-transform capitalize
		.container-species
			margin 10px
	.info-mode
	.info-species
		text-transform capitalize
	
		
</style>
