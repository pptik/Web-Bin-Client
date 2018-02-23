<template>
  <span>
    <div align="center" style="background: linear-gradient(141deg, #e74c3c 10%, #c0392b 51%, #c0392b 75%);color:#FFFFFF;" class="ui segment grey-text"><i class="user icon"></i>Civitas</div>
    <div class="ui segment grey-text">
      <!--
      <div class="ui top attached tabular menu">
        <a data-tab="first" class="item active">D</a>
        <a data-tab="second" class="item">Analisis Sikap</a>
      </div>
      <div data-tab="first" class="ui bottom attached tab segment active">
        <div class="sixteen wide column">
          <form class="ui form">
            <div class="field">
              <input type="text" placeholder="Tulis pencarian berdasarkan username atau nama lengkap" style="width:100%;"/>
            </div>
          </form>
        </div><br/><br/>
        <div  class="sixteen wide column">
          <table class="ui very basic collapsing table">
            <tr>
              <th>Foto profil</th>
              <th>Username</th>
              <th>Nama Lengkap</th>
              <th></th>
            </tr>
          </table>
        </div>
      </div>
      <div data-tab="second" class="ui bottom attached tab segment">
        <div class="sixteen wide column"><span><a href="#">Unduh hasil analisis</a></span>
          <table style="width:100%;" class="ui very basic collapsing table">
      <tr>
        <th>No</th>
        <th>Username</th>
        <th>Nama Siswa</th>
        <th>Nilai</th>
      </tr>
    </table>
        </div>
      </div>
      -->
      <ol>
          <li>
            <router-link to="/civitas/mahasiswa" class="item">
              Mahasiswa
            </router-link>
          </li>
          <li>
            <router-link to="/civitas/dosen" class="item">
              Dosen
            </router-link>
          </li>
      </ol>
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
