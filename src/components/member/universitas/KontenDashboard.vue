<template>
  <span>
    <div align="center" style="background: linear-gradient(141deg, #e74c3c 10%, #c0392b 51%, #c0392b 75%);color:#FFFFFF;" class="ui segment grey-text"><i class="info icon"></i>Informasi</div>
    <div class="ui segment grey-text">
      <p>
        Halo selamat datang! Silahkan gunakan bagian pada navigasi untuk mengakses fitur lainnya.
      </p>
    </div>
  </span>
</template>

<script>
  import global_json from '../../../assets/js/globalVariable.json';

  export default {
    name: "konten",
    data(){
      return{
        email: '',
        sandi: ''
      }
    },
    methods: {
      masuk:function () {

      }
    }
  }
</script>

<style scoped>

</style>
