<template>
  <section class="ui container">
    <navigation :highlight1="false" :highlight2="true" :highlight3="false"></navigation>
    <main class="ui segment" style='padding: 3em 4em 3em 4em;'>
        <main-content></main-content>
    </main>
    <copyright></copyright>
  </section>
</template>

<script>
    import '../../assets/js/slick.min.js'
    import Navigation from './Navigation.vue';
    import MainContent from './SignupContent.vue';

    export default {
      name: "index",
      created () {
        document.title = 'Sahabat Bawaslu | Masuk';
      },
      data(){
          return{

          }
      },
      beforeCreate:function () {
        if (this.$session.exists()){
          //go to home
        }
      },
        components: {
          'navigation' : Navigation,
          'main-content' : MainContent
        }
    }
</script>

<style>
  @import '../../assets/css/custom.css';

</style>
