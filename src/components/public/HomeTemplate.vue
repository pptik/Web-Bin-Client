<template>
  <section>
    <navigation :highlight1="true" :highlight2="false" :highlight3="false" ></navigation>

    <main-content></main-content>


    <copyright></copyright>

  </section>
</template>

<script>
    import '../../assets/js/slick.min.js'
    import Navigation from '../public/Navigation.vue';
    import MainContent from './HomeContent.vue';

    import global_json from '../../assets/js/globalVariable.json';

    export default {
      name: "index",
      beforeCreate:function () {
        if(this.$session.exists('access_token')){
          this.$router.push({path:'/admin/home'})
        }
      },
      created () {

          document.title = 'Badan Intelijen Negara | Home';
        },
      data(){
        return{

        }
        },
      components: {
          MainContent,
          'navigation' : Navigation,
          'main-content' : MainContent
        }
    }
</script>

<style>
  @import '../../assets/css/custom.css';

</style>
