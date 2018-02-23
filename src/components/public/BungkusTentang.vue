<template>
  <section class="ui container">
    <navigasi :highlight1="false" :highlight2="false" :highlight3="true" :highlight4="false" :highlight5="false"></navigasi>
    <main class="ui segment" style='padding: 3em 4em 3em 4em;'>
        <konten-utama></konten-utama>
    </main>
    <hak-cipta></hak-cipta>
  </section>
</template>

<script>
    import '../../assets/js/slick.min.js'
    import Navigasi from './Navigasi';
    import KontenUtama from './KontenTentang';

    export default {
        name: "index",
        created () {
          document.title = 'TADJ | Tentang';
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
