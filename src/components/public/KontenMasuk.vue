<template>
  <section class="ui grid stackable">
    <div class="eight wide column grey-text" align="center">
      <img src="/src/assets/images/logoBawasluOranye.svg" class="ui image medium"/>
    </div>
    <div class="eight wide column grey-text">
      <h2 class="primary-color">Masuk</h2><br/>
      <form class="ui form">
        <div class="field">
          <div>Email</div>
          <input type="text" autocomplete="kode" placeholder="Tulis email disini" v-model="kode"/>
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
  import global_json from '../../assets/js/globalVariable.json';

  export default {
    name: "konten",
    data(){
      return{
        kode: '',
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
            //alert(data.body.message)
            this.$session.set('sess_id',data.body.sessionid)
            this.$session.set('user_id',data.body.profile._id)
            this.$session.set('user_role',data.body.profile.privilege)
            this.$session.set('username',data.body.profile.name)
            this.$session.set('code',data.body.profile.code)
            this.$session.set('country',data.body.profile.id_country)

            this.$router.push({path:'/home'})

          }else if(data.body.success == false){
            alert(data.body.message)
          }
        });
      }
    }
  }




</script>

<style scoped>

</style>
