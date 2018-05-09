<!--<template>
    <section class="ui grid main container">
      <div class="eight wide column">
        <h1 class="home-text">Bin Administration Web</h1><br/>
      </div>
    <div class="eight wide column grey-text" align="right">
      <img src="/src/assets/images/logo.png" class="ui image medium"/>
    </div>
    </section>
</template>-->
<script>
  import global_json from '../../assets/js/globalVariable.json';
  export default {
    name: "konten",
    data(){
      return{
        email: '',
        sandi: ''
      }
    },
    methods: {
      masuk:function () {
      }
    }
  }
</script>
<style scoped>
</style>

<template>
  <section class="ui grid main container">
    <div class="eight wide column grey-text" align="center">
      <img src="/src/assets/images/upload-1.png" class="ui image medium"/>
    </div>
    <div class="eight wide column grey-text">
      <h2 class="primary-color">Masuk</h2><br/>
      <form class="ui form">

        <div class="ui negative message" v-if="hasError">
          <p>{{errorText}}</p>
        </div>
        <div class="field">
          <div>Username</div>
          <input type="text" autocomplete="field" placeholder="Tulis username disini" v-model="username"/>
        </div>
        <div class="field">
          <div>Sandi</div>
          <input type="password" autocomplete="password" placeholder="Tulis sandi disini" v-model="password"/>
        </div>
        <div class="field">
          <button v-on:click.prevent="masuk" type="button" style="color: white; background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;" class="huge ui button">Submit</button>
          <button v-on:click.prevent="daftar" type="button" style="color: white; background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;" class="huge ui button">Sign Up</button>

        </div>
      </form>
    </div>
  </section>
</template>

<script>
  const {restAPI}=require('../../assets/js/setup');
  const {globalSetup}=require('../../assets/js/setup');
  export default {
    name: "konten",
    data(){
      return{
        username: '',
        password: '',
        errorText:'',
        hasError:false,
      }
    },
    methods: {
      masuk:function () {
        this.$http.post(restAPI.signin,{
          username: this.username,

            password: this.password
          },{
            headers:{
              current_device:"-",
              current_number:"browser",
              carrier:"-"
            },
          }
        ).then(function (data) {
          console.log(data)
          if(data.body.success === true){
            let results=data.body.results;
            this.$session.set('access_token',results.access_token);
            this.$session.set('username',results.username);
            this.$session.set('name',results.name);
            this.$session.set('role',results.role);
            this.$session.set('email',results.email);
            this.$session.set('phone_number',results.phone_number);
            this.$session.set('UserData',results)
            console.log(data.body.rm)
            console.log(JSON.stringify(data.body.results))
          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
            console.log(data.body.rm)
          }
        });
      }
    }
  }
</script>
<style scoped>
</style>
