<template>
  <section class="ui container">
    <navigasi :highlight1="false" :highlight2="false" :highlight3="true" :highlight4="false" :highlight5="false"></navigasi>
    <section>
      <konten-utama></konten-utama>
    </section>
    <hak-cipta></hak-cipta>
  </section>
</template>

<script>
    import '../../../assets/js/slick.min.js'
    import Navigasi from './Navigasi';
    import KontenUtama from './KontenPengaturan';

    import global_json from '../../../assets/js/globalVariable.json';

    export default {
        name: "pengaturan",
        created () {

          if(this.$session.get('user_role') != 4){//Peran mahasiswa
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

          document.title = 'TADJ | Pengaturan';
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
