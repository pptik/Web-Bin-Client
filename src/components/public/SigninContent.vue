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
          <div>Email / Nomor Handphone / Username</div>
          <input type="text" autocomplete="field" placeholder="Tulis email disini" v-model="field"/>
        </div>
        <div class="field">
          <div>Sandi</div>
          <input type="password" autocomplete="password" placeholder="Tulis sandi disini" v-model="password"/>
        </div>
        <div class="field">
          <button v-on:click.prevent="masuk" type="button" style="color: white; background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;" class="huge ui button">Submit</button>
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
        field: '',
        password: '',
        errorText:'',
        hasError:false,
      }
    },
    methods: {
      masuk:function () {
        this.$http.post(restAPI.signin,{
          field: this.field,
          force:true,
          password: this.password,
          app_id:globalSetup.app_id
        },{
          headers:{
            current_device:"-",
            current_number:"browser",
            carrier:"-"
          },
          }
        ).then(function (data) {
          if(data.body.success === true){
            let results=data.body.results;
            this.$session.set('access_token',results.access_token);
            this.$session.set('username',results.username);
            this.$session.set('name',results.name);
            this.$session.set('email',results.email);
            this.$session.set('UserData',results);
            switch (results.role){
              case 0:
                this.$router.push({path:'/admin/home'});
                break;

              case 1:
                break;

            }
          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
