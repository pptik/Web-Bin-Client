<template>
  <div class="ui grid stackable">
    <div class="eight wide column grey-text">
      <h2 class="primary-color">Daftar sebagai Mahasiswa</h2><br/>
      <form class="ui form">
        <div class="field">
          <div>Email</div>
          <input type="text" name="email" placeholder="Email Anda untuk login" v-model="email"/>
        </div>
        <div class="field">
          <div>Sandi</div>
          <input type="password" name="sandi" placeholder="Sandi Anda untuk login" v-model="sandi"/>
        </div>
        <div class="field">
          <div>Username</div>
          <input type="text" name="username" placeholder="Buat username Anda" v-model="username"/>
        </div>
        <button v-on:click.prevent="daftarSebagaiMahasiswa" style="color: white; background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);" class="ui button">Kirim</button>
      </form>
    </div>
    <div class="eight wide column grey-text" align="center">
      <img src="/src/assets/images/carousel-3.png" class="ui image medium"/>
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
        username: '',
        sandi: ''
      }
    },
    methods: {
      daftarSebagaiMahasiswa:function () {
        this.$http.post(global_json.general_url+'/daftar/proses/mahasiswa',{
          email: this.email,
          username: this.username,
          sandi: this.sandi
        }).then(function (data) {
          if(data.body.success == true){
            this.$session.set('access_token',data.body.data.data.access_token)
            this.$session.set('user_id',data.body.data.data.user_id)
            this.$session.set('user_role',data.body.data.data.user_role)
            this.$session.set('username',data.body.data.data.username)

            this.$router.push({path:'/dashboard'})
          }else if(data.body.success == false){
            var pesan = '';
            //console.log('Kembalian: '+data.body.data.length)
            for(let a=0;a<data.body.data.length;a++){
              pesan += JSON.stringify(data.body.data[a].msg)+', ';
            }
            alert(pesan);
          }
        });
      }
    }
  }




</script>

<style scoped>

</style>
