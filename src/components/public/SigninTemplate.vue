<template>
  <section class="ui container">
    <navigation :highlight1="false" :highlight2="false" :highlight3="true"></navigation>


      <main-content></main-content>
    <copyright></copyright>
  </section>
</template>

<script>
  import '../../assets/js/slick.min.js'
  import Navigation from './Navigation.vue';
  import MainContent from './SigninContent.vue';

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
      if(this.$session.exists('access_token')){
        this.$router.push({path:'/admin/home'})
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
