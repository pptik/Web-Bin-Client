<template>
  <section class="ui container">
    <navigation :highlight1="true" :highlight2="false" :highlight3="false"></navigation>
    <div class="ui stackable sixteen column grid">
      <div class="eight wide column">
        <table border="1" width="100%">
          <tr>
            <th>File</th>
            <th>Tanggal</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>test.jpg</td>
            <td>22 Maret 2018</td>
            <td>Berhasil <button>riview</button></td>
          </tr>
        </table>
      </div>
      <div class="five wide column">
        <div class="ui segment">
          <div class="ui middle aligned divided list">
            <div style="padding:1em;" class="item">
              <div class="content">
                <table border="1" width="100%">
                  <tr>
                    <th>Riview</th>
                  </tr>
                  <tr>
                    <td>test.jpg</td>
                  </tr>
                  <tr>
                    <td>test.jpg</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="three wide column">
        <div class="ui segment">
          <div class="ui middle aligned divided list">
            <div style="padding:1em;" class="item">
              <div class="content">Hasil Selamat Datang!</div>
              <div class="content" style="margin-top: 10px"><router-link to="/hasil"><b>Hasil</b></router-link></div>
              <!--<div class="content">You are logged as <b>{{username}}</b></div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <copyright></copyright>
  </section>
</template>

<script>
  import global_json from '../../assets/js/globalVariable.json';

  export default {
    name: "konten",
    data(){
      return{
        email: '',
        sandi: ''
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
