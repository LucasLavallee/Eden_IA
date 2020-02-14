<template>
  <div class="container">
	  <div class="container-mode">
		  <span class="info-mode">{{getCurrentMode}}</span><br/>
	  </div>
		<transition name="fade">
			<div v-if="getCurrentMode==='add'" class="container-species">
				<img class="icon-specie" v-if="getCurrentSelection==='carrot'" :src="carrot"/>
				<img class="icon-specie" v-if="getCurrentSelection==='banana'" :src="banana"/>
				<img class="icon-specie" v-if="getCurrentSelection==='beet'" :src="beet"/>
				<img class="icon-specie" v-if="getCurrentSelection==='orange'" :src="orange"/>
				<img class="icon-specie" v-if="getCurrentSelection==='pear'" :src="pear"/>
				<img class="icon-specie" v-if="getCurrentSelection==='pepper'" :src="pepper"/>
				<img class="icon-specie" v-if="getCurrentSelection==='pumpkin'" :src="pumpkin"/>
				<img class="icon-specie" v-if="getCurrentSelection==='strawberry'" :src="strawberry"/>
				<img class="icon-specie" v-if="getCurrentSelection==='tomato'" :src="tomato"/>
				<img class="icon-specie" v-if="getCurrentSelection==='zucchini'" :src="zucchini"/>
			</div>
		</transition>
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
  name: 'Informations',
  computed: {
    	...mapGetters([
      	'getCurrentMode',
      	'getCurrentSelection'
    ])
  },
  data () {
    return {
      carrot: carrot,
      beet: beet,
      banana: banana,
      orange: orange,
      pear: pear,
      pepper: pepper,
      pumpkin: pumpkin,
      strawberry: strawberry,
      tomato: tomato,
      zucchini: zucchini
    }
  },
  methods: {
    getSpecieIcon () {
      switch (this.getCurrentSelection()) {
        case 'carrot':
          return carrot
          break
        case 'banana':
          return banana
          break
        case 'beet':
          return beet
          break
        case 'orange':
          return orange
          break
        case 'pear':
          return pear
          break
        case 'pepper':
          return pepper
          break
        case 'pumpkin':
          return pumpkin
          break
        case 'strawberry':
          return strawberry
          break
        case 'tomato':
          return tomato
          break
        case 'zucchini':
          return zucchini
          break
        default:
          break
      }
    }
  }
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
			.icon-specie
				width 30px
	.info-mode
	.info-species
		text-transform capitalize

	// Animation handler
	.fade-enter-active {
    transition: opacity  .2s ease-out, transform .5s cubic-bezier(.22,1.07,.57,1.42)
		transition-delay .3s
  }

   .fade-leave-active {
     transition: opacity .2s ease-in, transform .3s ease-in
   }

  .fade-enter, .fade-leave-to {
    transform: translateY(-20px)
    opacity: 0
  }

</style>
