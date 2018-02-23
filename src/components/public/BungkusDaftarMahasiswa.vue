<template>
  <section class="ui container">
    <navigasi :highlight1="false" :highlight2="false" :highlight3="false" :highlight4="false" :highlight5="true"></navigasi>
    <main class="ui segment" style='padding: 3em 4em 3em 4em;'>
        <konten-utama></konten-utama>
    </main>
    <hak-cipta></hak-cipta>
  </section>
</template>

<script>
    import '../../assets/js/slick.min.js'
    import Navigasi from './Navigasi';
    import KontenUtama from './KontenDaftarMahasiswa';

    export default {
        name: "index",
        created () {
          document.title = 'TADJ | Daftar sebagai Mahasiswa';
        },
        data(){
          return{

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
