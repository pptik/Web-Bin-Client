<template>
  <div class="ui grid stackable">
    <div class="eight wide column grey-text">
      <h2 class="primary-color">Daftar</h2><br/>
      <form class="ui form">
        <div class="field">
          <div>Username</div>
          <input type="text" autocomplete="username" placeholder="Tulis username disini" v-model="username"/>
        </div>
        <div class="field">
          <div>Nama Lengkap</div>
          <input type="text" autocomplete="username" placeholder="Tulis nama lengkap disini" v-model="nama_lengkap"/>
        </div>
        <div class="field">
          <div>Email</div>
          <input type="email" autocomplete="email" placeholder="Tulis email disini" v-model="email"/>
        </div>
        <div class="field">
          <div>Handphone</div>
          <input type="number" autocomplete="number" placeholder="Tulis no HP disini" v-model="no_hp"/>
        </div>
        <div class="field">
          <div>Sandi</div>
          <input type="password" autocomplete="sandi" placeholder="Tulis sandi disini" v-model="sandi"/>
        </div>
        <div class="field">
          <button v-on:click.prevent="masuk" type="button" style="color: white; background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;" class="huge ui button">Submit</button>
        </div>
      </form>
    </div>
    <div class="eight wide column grey-text">
      <h2 class="primary-color" style="visibility: hidden;">Daftar</h2><br/>
      <form class="ui form">
        <div class="field">
          <div>Provinsi</div>
          <select class="ui search dropdown" v-model="provinsi">
            <option value="">Pilih Provinsi</option>
            <option value="JB">Jawa Barat</option>
            <option value="JT">Jawa Timur</option>
          </select>
        </div>
        <div class="field">
          <div>Kota atau Kabupaten</div>
          <select class="ui search dropdown" v-model="kota_kabupaten">
            <option value="">Pilih Provinsi</option>
            <option value="JB">Bandung</option>
            <option value="JT">Jakarta</option>
          </select>
        </div>
        <div class="field">
          <div>Kelurahan</div>
          <select class="ui search dropdown" v-model="kelurahan">
            <option value="">Pilih Kelurahan</option>
            <option value="JB">Lengkong</option>
            <option value="JT">Lengkong</option>
          </select>
        </div>
        <div class="field">
          <div>Kecamatan</div>
          <select class="ui search dropdown" v-model="kecamatan">
            <option value="">Pilih Kecamatan</option>
            <option value="JB">Lengkong</option>
            <option value="JT">Lengkong</option>
          </select>
        </div>
        <div class="field">
          <div>No KTP</div>
          <input type="text" autocomplete="number" placeholder="Tulis no KTP disini" v-model="no_ktp"/>
        </div>
      </form>
    </div>
  </div>

</template>

<script>

  export default {
    name: "konten",
    data(){
      return{
        username: '',
        nama_lengkap: '',
        sandi: '',
        email: '',
        no_hp: '',
        provinsi: '',
        kota_kabupaten: '',
        kelurahan: '',
        kecamatan: '',
        no_ktp: '',
        daftar_provinsi: [],
        daftar_kota_kabupaten: [],
        daftar_kecamatan: [],
        daftar_kelurahan: []
      }
    }
  }




</script>

<style scoped>

</style>
