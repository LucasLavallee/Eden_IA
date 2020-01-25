<template>
  <div class="home">
    <About/>
    <Rules/>
  </div>
</template>

<script>
import About from '@/components/Home/About'
import Rules from '@/components/Home/Rules'

export default {
  name: 'home',
  components: {
    About,
    Rules
  }
}
</script>
