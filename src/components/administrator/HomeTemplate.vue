<template>
  <section class="ui container">
    <navigation :highlight1="true" :highlight2="false"></navigation>
    <div class="ui stackable sixteen column grid">
      <div class="three wide column">
        <div class="ui segment">
          <div class="ui middle aligned divided list">
            <div style="padding:1em;" class="item">
              <div class="content"><router-link to="/administrator/users" class="grey-text"><i class="user icon"></i>Users</router-link></div>
            </div>
            <div style="padding:1em;" class="item">
              <div class="content"><router-link to="/administrator/questions" class="grey-text"><i class="write icon"></i>Questions</router-link></div>
            </div>
            <div style="padding:1em;" class="item">
              <div class="content"></div><router-link to="/administrator/moderation" class="grey-text"><i class="talk outline icon"></i>Moderation</router-link>
            </div>
            <div style="padding:1em;" class="item">
              <div class="content"></div><router-link to="/administrator/grades" class="grey-text"><i class="newspaper icon"></i>Grades</router-link>
            </div>
            <div style="padding:1em;" class="item">
              <div class="content"></div><router-link to="/administrator/timer_olympiad" class="grey-text"><i class="hourglass end icon"></i>Timer Olympiad</router-link>
            </div>
          </div>
        </div>
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
    <hak-cipta></hak-cipta>
  </section>
</template>

<script>
    import '../../assets/js/slick.min.js'
    import Navigation from '../public/Navigation.vue';
    import MainContent from './HomeContent.vue';

    import global_json from '../../assets/js/globalVariable.json';

    export default {
        name: "index",
        created () {

          if(this.$session.get('user_role') !== 0){
            alert("You have no permit to access this page");
            this.$router.push({path:'/'})
          }

          document.title = 'Sahabat Banwaslu | Home';
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
