<template>
  <div class="about">
    <div class="text">
      <h1>EDENIA</h1>
      <h2>La planète végétale 3.0</h2>
      <p>Bienvenue à EdenIA, la planète végétale de la galaxie IMAC ! Tu as été envoyé(e) par l'équipage de la station E.J.20 pour créer un verger et un potager qui permettront aux populations à venir de s'alimenter sainement et sur des générations, assurant leur survie sur la planète. </p>
      <p>Afin de mener à bien ta mission, ton commandant t'a fourni plusieurs sacs de graines te permettant de planter différentes espèces de fruits et légumes. Il t'a également donné une télécommande révolutionnaire te permettant d'influencer les conditions environnementales. Attention, tu dois l'utiliser avec la plus grande attention. L'avenir de l'Homme est entre tes mains !</p>

      <button type="button"><a href="./edenIA">Commencer !</a></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="stylus">
  @font-face
    font-family 'Space Comics'
    src url(../../../public/Space_Comics.ttf) format('truetype')
  
  h2
    margin-top 0

  .home .about
    width 100%
    height 100vh
    background-size cover
    background-repeat no-repeat
    background-position bottom right

  .home .about .text
    text-align left
    width 30%
    margin-left 8%
    padding-top 10%

  .home .about .text h1
    font-family 'Space Comics', Calibri, sans-serif

  .home .about .text h1
    color #089622
    font-size 2.5em
    margin 0
    text-shadow 0px 0px 15px #c2c2c2c2

  .home .about .text button
    border 2px solid #089622
    border-radius 20px
    padding 10px 30px
    font-size 1em
    margin-top 20px
    animation: scale 2s infinite

  .home .about .text button:hover
    cursor pointer

  .home .about .text button a
    margin-right 0

  @media screen and (min-width: 1600px)
    .home .about .text
      padding-top 15%

    .home .about .text p
      font-size 1.2em

  @media screen and (min-width: 801px)
    .home .about
      background-image url('../../../public/Background-plants.svg')

  @media screen and (max-width: 800px)
    .home .about
      background-image url('../../../public/Background-mobile.svg')

    .home .about .text
      text-align center
      width 80%
      margin 0 auto
      padding-top 15%

  @media screen and (min-width: 641px)
    .home .about .text button
      background-color transparent
    
    .home .about .text button a
      color #000

    .home .about .text button:hover
      border 2px solid #fff
      background-color #089622

    .home .about .text button a:hover
      color #fff

  @media screen and (max-width: 640px)
    .home .about .text
      padding-top 20%

    .home .about .text button
      border 2px solid #000
      background-color #089622

    .home .about .text button a
      color #fff

    .home .about .text button:hover
      background-color #fff
    
    .home .about .text button a:hover
      color #089622

  @media screen and (max-width: 400px)
    .home .about
      background-image url('../../../public/Background-mobile-fade.svg')
      background-position center bottom

  @keyframes scale
    0%
      transform scale(1)
    50%
      transform scale(0.8)
    100%
      transform scale(1)
</style>