<template>
  <div class="team">
    <h2>L'équipage d'E.J.20</h2>
    <div class="team-details">
      <div class="lucas">
        <h3>Lucas Lavallée</h3>
        <h4>Le commandant</h4>
        <img src="../../../public/Lucas.svg" width="" height="" alt="lucas">
        <p>Développeur, Lucas mène son équipage avec brio dans les missions les plus périlleuses. Eminant chercheur, il a mis au point le système génétique des plantes et a minutieusement étudié l'environnement d'EdenIA.</p>

        <!--<div class="links">
          <img src="../../../public/linkedin.svg" width="" height="" alt="linkedin icon">
          <img src="../../../public/internet.svg" width="" height="" alt="internet icon">
        </div>-->
      </div>

      <div class="jeremy">
        <h3>Jeremy Ratsimandresy</h3>
        <h4>L'inventeur</h4>
        <img src="../../../public/Jeremy.svg" width="" height="" alt="lucas">
        <p>Développeur et web designer, Jeremy est l'inventeur de la télécommande révolutionnaire te permettant de contrôler les conditions environnementales. Il a également travaillé sur le design de l'interface de contrôle permettant de suivre l'évolution des cultures sur EdenIA.</p>

        <!--<div class="links">
          <img src="../../../public/linkedin.svg" width="" height="" alt="linkedin icon">
          <img src="../../../public/internet.svg" width="" height="" alt="internet icon">
        </div>-->
      </div>

      <div class="manon">
        <h3>Manon Sebaoun</h3>
        <h4>Designeuse de fruits & légumes</h4>
        <img src="../../../public/Manon.svg" width="" height="" alt="lucas">
        <p>Développeuse et graphiste, Manon a travaillé en collaboration avec Lucas au développement des plantes, en particulier sur leur forme de fruit/légume. Elle a également crée le design de la page d'accueil en l'aggrémentant de douces créatures (peut-être de futurs compagnons pour l'équipage ?).</p>

        <!--<div class="links">
          <a href="https://www.linkedin.com/in/manon-sebaoun-793b2b124/" target="_blank"><img src="../../../public/linkedin.svg" width="" height="" alt="linkedin icon"></a>
          <a href="https://manon-seb.github.io/" target="_blank"><img src="../../../public/internet.svg" width="" height="" alt="internet icon"></a>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Team'
}
</script>

<style lang="stylus">
  @font-face
    font-family 'Space Comics'
    src url(../../../public/Space_Comics.ttf) format('truetype')

  .team
    color #000
    padding 5%
    background-image url('../../../public/Background-team-white.svg')
    background-size cover
    background-repeat no-repeat
    background-position center center
    font-family Raleway, Calibri, sans-serif

  .team h2, .team h3
    font-family 'Space Comics', Calibri, sans-serif
    text-transform uppercase

  .team h2
    margin-top 0
    font-family 'Space Comics', Calibri, sans-serif
    color #089622
    text-shadow 0 0 5px #fff

  .team h3
    margin-bottom 0
    line-height 2em

  .team h4
    margin-top 10px

  .team .team-details
    margin-top: 5%

  .team .team-details img
    max-width 100%

  .team .team-details div .links
    width 100%
    text-align center
    margin-top 20px
    margin-bottom 15px

  .team .team-details div .links img
    width 10%
    height auto
    margin 0 15px

  @media screen and (min-width: 801px)
    .team .team-details
      display flex
      flex-direction row
      justify-content space-around

    .team .team-details div
      width: 30%

    .team .team-details > img
      width 60%
      height auto

  @media screen and (max-width: 800px)
    .team .team-details div
      margin-bottom 5%
      display block

    .team .team-details > img
      width 40%
      height auto

    .team .team-details div:first-child, .team .team-details div:nth-child(2)
      border-bottom 1px solid #fff

  @media screen and (max-width: 640px)
    .team h2
      line-height 2em

</style>
