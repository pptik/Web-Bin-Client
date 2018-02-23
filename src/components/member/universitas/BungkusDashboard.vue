<template>
  <section class="ui container">
    <navigasi :highlight1="true" :highlight2="false" :highlight3="false" :highlight4="false" :highlight5="false" :highlight6="false"></navigasi>
    <section>
      <div class="ui equal width grid">
        <div class="column">
          <div class="ui segment">
            <div class="ui middle aligned divided list">
              <div style="padding:1em;" class="item">
                <div class="content"><a href="#" class="grey-text"><i class="write icon"></i>Blog</a></div>
              </div>
              <div style="padding:1em;" class="item">
                <div class="content"><a href="#" class="grey-text"><i class="talk outline icon"></i>Forum</a></div>
              </div>
              <div style="padding:1em;" class="item">
                <div class="content"></div><a href="#" class="grey-text"><i class="user icon"></i>Portofolio</a>
              </div>
            </div>
          </div>
        </div>
        <div class="eight wide column">
          <konten-utama></konten-utama>
        </div>
        <div class="column">
          <div class="ui card">
            <div class="image"><img v-bind:src="fotoProfil"/></div>
            <div class="content"><a class="header">{{username}}</a>
              <div class="meta"><span class="date">{{namaLengkap}}</span></div>
              <div class="description">{{bio}}</div>
            </div>
            <div class="extra content">
              <router-link to="/pengaturan">
                <i class="setting icon"></i>Pengaturan
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <hak-cipta></hak-cipta>
  </section>
</template>

<script>
    import '../../../assets/js/slick.min.js'
    import Navigasi from './Navigasi';
    import KontenUtama from './KontenDashboard';

    import global_json from '../../../assets/js/globalVariable.json';

    export default {
        name: "index",
        created () {

          if(this.$session.get('user_role') != 2){//Peran universitas
            alert("Anda tidak diizinkan untuk mengakses halaman yang dituju")
            this.$router.push({path:'/'})
          }

          //Cek berlakunya session
          this.$http.post(global_json.general_url+'/cek_session',{
            access_token: this.$session.get('access_token')
          }).then(function (data) {
            if(data.body.success == true){
              if(data.body.data.data.status == 0){//Session tidak berlaku
                this.$session.destroy()
                alert("Session anda tidak berlaku atau sudah expired. Silahkan masuk kembali.")
                this.$router.push('/')
              }
            }else if(data.body.success == false){
              console.log(data.body.data.message)
            }
          });

          //Ambil profil pengguna
          this.$http.post(global_json.general_url+'/profil',{
            username: this.$session.get('username'),
            access_token: this.$session.get('access_token')
          }).then(function (data) {
            if(data.body.success == true){
              this.username = data.body.data.data[0].profil.username;
              this.namaLengkap = data.body.data.data[0].profil.nama_lengkap;
              this.fotoProfil = data.body.data.data[0].profil.foto_profil;
              this.bio = data.body.data.data[0].profil.bio;
            }else if(data.body.success == false){
              console.log(data.body.data.message)
            }
          });

          document.title = 'TADJ | Dashboard';
        },
        data(){
          return{
            username: '',
            namaLengkap: '',
            fotoProfil: '',
            bio: ''
          }
        },
        components: {
          'navigasi' : Navigasi,
          'konten-utama' : KontenUtama
        }
    }
</script>

<style>
  @import '../../../assets/css/custom.css';

</style>
