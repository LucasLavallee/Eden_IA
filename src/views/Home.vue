<template>
  <div class="home">
    <About/>
    <Rules/>
    <Team/>
  </div>
</template>

<script>
import About from '@/components/Home/About'
import Rules from '@/components/Home/Rules'
import Team from '@/components/Home/Team'

export default {
  name: 'home',
  components: {
    About,
    Rules,
    Team
  }
}
</script>
