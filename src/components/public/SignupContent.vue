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
          <div>Email</div>
          <input type="text" autocomplete="field" placeholder="Tulis email disini" v-model="email"/>
        </div>
        <div class="field">
          <div>Username</div>
          <input type="text" autocomplete="username" placeholder="Tulis username disini" v-model="username"/>
        </div>
        <div class="field">
          <div>Nomor Handphone</div>
          <input type="text" autocomplete="phonenumber" placeholder="Tulis nomor handphone disini" v-model="phonenumber"/>
        </div>
        <div class="field">
          <div>Sandi</div>
          <input type="password" autocomplete="password" placeholder="Tulis sandi disini" v-model="password"/>
        </div>
        <div class="field">
          <div>Ulangi Sandi</div>
          <input type="password" placeholder="Ulangi sandi anda" v-model="confirmpassword"/>
        </div>
        <div class="field">
          <div>Kode Referensi</div>
          <input type="text" autocomplete="referencecode" placeholder="Tulis kode referensi jika ada" v-model="referencecode"/>
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
        email:'',
        username:'',
        phonenumber:'',
        password: '',
        confirmpassword: '',
        referencecode:'',
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
        if(this.email===''){
          this.hasError=true;
          this.errorList.push("Email Tidak Boleh Kosong")
        }
        if(this.username===''){
          this.hasError=true;
          this.errorList.push("Username Tidak Boleh Kosong")
        }
        if(this.phonenumber===''){
          this.hasError=true;
          this.errorList.push("Nomor Handphone Tidak Boleh Kosong")
        }
        if(this.password===''){
          this.hasError=true;
          this.errorList.push("Password Tidak Boleh Kosong")
        }
        if(this.password!==this.confirmpassword){
          this.hasError=true;
          this.errorList.push("Password Anda Tidak Sesuai")
        }
        if(this.referencecode===''){
          this.hasError=true;
          this.errorList.push("Silahkan isi kode referensi")
        }
        if(this.hasError){
          this.errorText="Silahkan Lengkapi Data Anda";
        }else {
          this.$http.post(restAPI.signup,{
             Email:this.email,
            Username:this.username,
            PhoneNumber:this.phonenumber,
            Password:this.password,
            ReferenceCode:this.referencecode,
            SignupType:1
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
