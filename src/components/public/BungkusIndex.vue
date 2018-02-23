<template>
  <section class="ui container">
    <navigasi :highlight1="true" :highlight2="false" :highlight3="false"></navigasi>
    <main style="padding: 3em 4em 3em 4em;background:linear-gradient(to right, #ff8101 0%,#f7be3b 50%,#f7be3b 51%,#ffa042 100%);" class="ui segment">
        <konten-utama></konten-utama>
    </main>
    <hak-cipta></hak-cipta>
  </section>
</template>

<script>
    import '../../assets/js/slick.min.js'
    import Navigasi from './Navigasi';
    import KontenUtama from './KontenIndex';

    export default {
        name: "index",
        data(){
          return{

          }
        },
        created () {
          document.title = 'Sahabat Bawaslu | Selamat datang di portal Sahabat Bawaslu';
          if(this.$session.get('user_role') != null){//Mencek apakah pengguna mengakses sebagai member
            this.$router.push({path:'/home'})
          }
        },
        components: {
          'navigasi' : Navigasi,
          'konten-utama' : KontenUtama
        }
    }
</script>

<style>
  @import '../../assets/css/custom.css';

</style>
