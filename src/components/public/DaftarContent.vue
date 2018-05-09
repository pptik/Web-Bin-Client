<template>
  <section class="ui grid main container">
    <div class="eight wide column grey-text" align="center">
      <img src="/src/assets/images/logoBawasluOranye.svg" class="ui image medium"/>
    </div>
    <div class="eight wide column grey-text">
      <h2 class="primary-color">Daftar</h2><br/>
      <form class="ui form">

        <div class="ui negative message" v-if="hasError">
          <p>{{errorText}}</p>
          <ul id="example-1">
            <li v-for="error in errorList">
              {{ error }}
            </li>
          </ul>

        </div>
        <div class="field">
          <div>Username</div>
          <input type="text" autocomplete="username" placeholder="Tulis username disini" v-model="username"/>
        </div>
        <div class="field">
          <div>Sandi</div>
          <input type="password" autocomplete="password" placeholder="Tulis sandi disini" v-model="password"/>
        </div>
        <div class="field">
          <button v-on:click.prevent="signup" type="button" style="color: white; background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;" class="huge ui button">Submit</button>
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
        username:'',
        password: '',
        referenced:false,
        errorText:'',
        errorList:[],
        hasError:false,
      }
    },
    methods: {
      signup:function () {
        this.errorList=[];
        this.hasError=false;
        if(this.username===''){
          this.hasError=true;
          this.errorList.push("Username Tidak Boleh Kosong")
        }
        if(this.password===''){
          this.hasError=true;
          this.errorList.push("Password Tidak Boleh Kosong")
        }
        if(this.hasError){
          this.errorText="Silahkan Lengkapi Data Anda";
        }else {
          this.$http.post(restAPI.signup,{
            Username:this.username,
            Password:this.password
            }
          ).then(function (data) {
            console.log(data);
            if(data.body.success === true){
              this.$router.push({path:'sigin'})
            }else if(data.body.success === false){
              this.hasError=true;
              this.errorText=data.body.rm;
            }
          });
        }
      }
    }
  }
</script>
<style scoped>
</style>
