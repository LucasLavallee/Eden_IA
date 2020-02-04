<template>
  <div class="rules">
    <div class="intro">
      <h2>RÈGLES DU JEU</h2>
      <p>Fais d'EdenIA une planète riche en cultures de fruits et légumes ! Chaque face de la planète est destinée à un type de culture : un potager (où on cultive les légumes) ou un verger (où on cultive les fruits). Plus tes cultures prospèreront dans le temps, plus ce sera une garantie de survie pour les habitants à venir sur EdenIA !</p>
    </div>

    <div class="elements">
      <div class="fruits">
        <img src="../../../public/Banana.svg" width="" height="" alt="banana">
        <h3>Les fruits</h3>
        <p>Tu peux planter 5 variétés de fruits : des oranges, des poires, des fraises, des bananes et des tomates.</p>
      </div>

      <div class="environment">
        <img src="../../../public/Remote.svg" width="" height="" alt="remote">
        <h3>L'environnement</h3>
        <p>Grâce la télécommande révolutionnaire, tu peux influencer les paramètres suivants : la température, le taux d'humidité, la pollution et la luminosité. Chaque saison a des caractéristiques de base qui lui sont propres. Afin de ne pas créer le chaos, la télécommande t'empêche de passer certains seuils selon les saisons (on évitera les températures polaires en été par exemple).</p>
      </div>

      <div class="vegetables">
        <img src="../../../public/Pepper.svg" width="" height="" alt="pepper">
        <h3>Les légumes</h3>
        <p>Tu peux planter 5 variétés de légumes : des betteraves, des courgettes, des carottes, des citrouilles et des poivrons.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rules'
}
</script>

<style lang="stylus">
  @font-face
    font-family 'Space Comics'
    src url(../../../public/Space_Comics.ttf) format('truetype')

  h2
    margin-top 0

  .home .rules
    background-color #815B50
    padding 5%
    color #fff

  .home .rules h2
    color #089622
    text-shadow 0px 0px 15px #000

  .home .rules .elements
    margin-top 3%

  .home .rules h3
    color #000
    text-shadow 0px 0px 5px #fff
    text-transform uppercase
    font-family 'Space Comics', Calibri, sans-serif
    line-height 1.5em
    -webkit-hyphens auto
    -moz-hyphens auto
    -ms-hyphens auto
    -o-hyphens auto
    hyphens auto

  .home .rules .fruits img, .home .rules .vegetables img, .home .rules .environment img
    max-width 100%

  .home .rules .fruits img, .home .rules .vegetables img
    width 50%

  .home .rules .environment img
    width 80%

  @media screen and (min-width: 801px)
    .home .rules .elements
      display flex
      flex-direction row
      justify-content space-around

    .home .rules .elements div:first-child, .home .rules .elements div:last-child
      width: 20%

    .home .rules .elements div:nth-child(2)
      width 50%

  @media screen and (max-width: 640px)
    .home .rules .intro
      margin-top 10%

    .home .rules .elements
      display block

    .home .rules .elements div
      width 90%
      margin 0 auto

    .home .rules .elements div:nth-child(2)
      margin-top: 10%
</style>
