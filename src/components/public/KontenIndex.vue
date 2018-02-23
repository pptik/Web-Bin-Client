<template>
  <div class="ui grid stackable">
    <div class="eight wide column white-text">
      <h1>Selamat datang</h1>
      <!--<p>Sahabat Bawaslu</p>-->
      <form class="ui form">
        <div class="required field">
          <div>Email</div>
          <input type="email" placeholder="Tulis email disini" autocomplete="email" v-model="email"/>
        </div>
        <div class="required field">
          <div>Sandi</div>
          <input type="password" autocomplete="password" placeholder="Tulis sandi disini" v-model="password"/>
        </div>
        <div class="required field">
          <button type="button"
                  style="background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;"
                  v-on:click.prevent="masuk" class="huge ui button button-submit">Submit</button>
        </div>
      </form>
    </div>

    <div  class="eight wide column" align="center">
      <div><img src="/src/assets/images/logoBawaslu.svg" class="ui image medium"/></div>
        <!-- <span class="white-text"><b>Ambil Kelompok</b></span></div>-->
    </div>

  </div>

</template>

<script>
  import global_json from '../../assets/js/globalVariable.json';

  export default {
    name: "konten",
    data(){
      return{
        email: '',
        password: ''
      }
    },
    methods: {
      masuk:function () {
        this.$http.post(global_json.general_url+global_json.api.login,{
          Kode: this.kode,
          Password: this.password
        }).then(function (data) {
          if(data.body.success == true){//Login Succeed

            this.$session.set('sess_id',data.body.sessionid)

            this.$router.push({path:'/home'})

          }else if(data.body.success == false){
            alert(data.body.message)
            this.$router.push({path:'/login'})
          }
        });
      }
    }
  }




</script>

<style scoped>

</style>
