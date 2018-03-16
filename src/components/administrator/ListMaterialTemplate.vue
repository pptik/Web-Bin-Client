<template>
  <section class="ui container">
    <navigation :highlight1="true" :highlight2="false" :highlight3="false"></navigation>
    <div class="ui stackable sixteen column grid">
      <div class="three wide column">
        <left-navigation></left-navigation>
      </div>
      <div class="ten wide column">

        <main-content></main-content>
      </div>
      <div class="three wide column">
        <div class="ui segment">
          <div class="ui middle aligned divided list">
            <div style="padding:1em;" class="item">
              <div class="content">You are logged as <b>{{username}}</b></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <copyright></copyright>
  </section>
</template>

<script>
    import '../../assets/js/slick.min.js'
    import Navigation from './Navigation.vue';
    import LeftNavigation from './LeftNavigation.vue';
    import MainContent from './ListMaterialContent.vue';

    import global_json from '../../assets/js/globalVariable.json';

    export default {
        name: "index",
      beforeCreate(){
        if(this.$session.get('role') !== 0){
          this.$router.push({path:'/notfound'})
        }
        document.title = 'Sahabat Banwaslu | Home';
      },
        created () {

        },
        data(){
          return{
            username: this.$session.get('username'),

          }
        },
        components: {
          MainContent,
          'left-navigation' : LeftNavigation,
          'navigation' : Navigation,
          'main-content' : MainContent
        }
    }
</script>

<style>
  @import '../../assets/css/custom.css';

</style>
