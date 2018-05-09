<template>
  <section class="ui container">
    <navigation :highlight1="true" :highlight2="false" :highlight3="false"></navigation>
<main-content></main-content>
  </section>
</template>
<script>
    import '../../assets/js/slick.min.js'
    import Navigation from './Navigation.vue';
    import MainContent from './HasilContent.vue';

    import global_json from '../../assets/js/globalVariable.json';

    export default {
        name: "index",
      beforeCreate(){
        if(this.$session.get('role') !== 0){
          this.$router.push({path:'/notfound'})
        }
        document.title = 'Badan Intelijen Negara| Home';
      },

        data(){
          return{
            username: this.$session.get('username')
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
