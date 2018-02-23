<template>
  <span>
    <div align="center"
         style="background: linear-gradient(141deg, #e74c3c 10%, #c0392b 51%, #c0392b 75%);color:#FFFFFF;"
         class="ui segment grey-text"><i class="users icon"></i>Pilih Universitas Anda Mengambil TA</div>
    <div class="ui segment grey-text">
      <p v-if="status_pemilikan_universitas == false">Silahkan tekan tombol Tambah Universitas di bawah ini untuk mendaftarkan diri Anda ke Universitas/ Institusi pendidikan dimana anda mengambil TA.</p>
      <div class="ui relaxed divided list">
        <div class="item" v-for="universitas in universitas_mahasiswa">
          <div class="content">
            <a class="header">{{universitas.universitas.profil.nama_lengkap}}</a>
            <div class="description">{{universitas.jenjang.nama}} | {{universitas.prodi.nama}} | {{universitas.nim_nip}}</div>
            <a class="ui yellow label" v-if="universitas.status_konfirmasi == 0">Dalam proses konfirmasi</a>
            <a class="ui green label" v-else-if="universitas.status_konfirmasi == 1" href="#">Menuju menu kelompok TA</a>
          </div>
        </div>
      </div>

      <button type="button"
              style="background: linear-gradient(to bottom, rgba(73,155,234,1) 0%, rgba(6,77,153,1) 100%);color:#FFFFFF;"
              v-on:click.prevent="tambah_universitas" class="medium ui button button-submit">Tambah Universitas</button>
    </div>

    <div class="ui modal tambah-universitas"><i class="close icon"></i>
      <div class="header">Tambah Institusi Pendidikan</div>
      <div class="content">
        <form class="ui form">
          <div class="field">
            <label>Institusi Pendidikan</label>
            <select class="ui dropdown" v-on:change="ambil_daftar_jenjang" v-model="select_universitas">
              <option>Pilih Institusi Pendidikan</option>
              <option v-for="universitas in daftar_universitas" :value="universitas._id">{{universitas.profil.nama_lengkap}}</option>
            </select>
          </div>
          <div class="field">
            <label>Jenjang</label>
            <select v-model="select_jenjang" v-on:change="ambil_daftar_prodi" class="ui dropdown">
              <option>Pilih Jenjang</option>
              <option v-for="jenjang in daftar_jenjang" :value="jenjang._id">{{jenjang.nama}}</option>
            </select>
          </div>
          <div class="field">
            <label>Prodi</label>
            <select v-model="select_prodi" class="ui dropdown">
              <option value="">Pilih Prodi</option>
              <option v-for="prodi in daftar_prodi" :value="prodi._id">{{prodi.nama}}</option>
            </select>
          </div>
          <div class="field">
            <label>NIM</label>
            <input type="text" v-model="input_nim" placeholder="Tuliskan NIM"/>
          </div>
          <div class="field">
            <button type="button"
                    style="background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;"
                    class="ui button" v-on:click.prevent="tambah_universitas_proses">Kirim</button>
          </div>
        </form>
      </div>
    </div>

  </span>
</template>

<script>
  import global_json from '../../../assets/js/globalVariable.json';

  export default {
    name: "konten",
    data() {
      return {
        jumlah_universitas: '',
        daftar_universitas: [],
        daftar_jenjang: [],
        daftar_prodi: [],
        universitas_mahasiswa: [],
        select_universitas: '',
        select_jenjang: '',
        select_prodi: '',
        input_nim: '',
        status_pemilikan_universitas: false
      }
    },
    created() {
      //Mencek universitas pengguna
      this.$http.post(global_json.general_url + '/mahasiswa/daftar_universitas', {
        access_token: this.$session.get('access_token'),
        pengguna: this.$session.get('user_id')
      }).then(function (data) {
        if (data.body.success == true) {
          if(data.body.data.data[0].akademik.universitas_prodi.length == 0){//Apabila belum terdaftar dalam universitas
            this.status_pemilikan_universitas = false
          }else{//Sudah terdaftar dalam universitas
            this.status_pemilikan_universitas = true
          }
          this.universitas_mahasiswa = data.body.data.data[0].akademik.universitas_prodi;
        } else if (data.body.success == false) {
          console.log('M: Gagal mengembalikan banyaknya universitas siswa')
        }
      });

      //Menampilkan daftar universitas di form tambah
      this.$http.post(global_json.general_url + '/institusi/daftar', {
        access_token: this.$session.get('access_token')
      }).then(function (data) {
        if (data.body.success == true) {
          for(let a=0;a<data.body.data.data.length;a++){
            this.daftar_universitas.push(data.body.data.data[a])
          }
          //console.log('universitas: '+JSON.stringify(data.body.data.data))
        } else if (data.body.success == false) {
          console.log('M: Gagal mengembalikan daftar universitas yang terdaftar dalam platform TADJ')
        }
      });

    },
    methods: {
      tambah_universitas: function () {
        $('.ui.modal.tambah-universitas')
          .modal('show')
      },
      ambil_daftar_jenjang: function () {
        this.$http.post(global_json.general_url + '/jenjang/daftar', {
          access_token: this.$session.get('access_token'),
          universitas: this.select_universitas
        }).then(function (data) {
          if (data.body.success == true) {
            this.daftar_jenjang.length = 0
            for(let a=0;a<data.body.data.data[0].akademik.jenjang.length;a++){
              this.daftar_jenjang.push(data.body.data.data[0].akademik.jenjang[a])
            }
            //console.log('universitas: '+JSON.stringify(data.body.data.data))
          } else if (data.body.success == false) {
            console.log('M: Gagal mengembalikan daftar jenjang pada universitas dalam platform TADJ')
          }
        });
      },
      ambil_daftar_prodi: function () {
        this.$http.post(global_json.general_url + '/jenjang/prodi', {
          access_token: this.$session.get('access_token'),
          jenjang: this.select_jenjang
        }).then(function (data) {
          if (data.body.success == true) {
            this.daftar_prodi.length = 0
            for(let a=0;a<data.body.data.data[0].prodi.length;a++){
              this.daftar_prodi.push(data.body.data.data[0].prodi[a])
            }
            //console.log('universitas: '+JSON.stringify(data.body.data.data))
          } else if (data.body.success == false) {
            console.log('M: Gagal mengembalikan daftar prodi pada universitas dalam platform TADJ')
          }
        });
      },
      tambah_universitas_proses: function () {
        this.$http.post(global_json.general_url + '/mahasiswa/tambah_institusi_pendidikan', {
          access_token: this.$session.get('access_token'),
          pengguna: this.$session.get('user_id'),
          institusi: this.select_universitas,
          jenjang: this.select_jenjang,
          prodi: this.select_prodi,
          nim: this.input_nim
        }).then(function (data) {
          if (data.body.success == true) {
            alert('Anda berhasil mendaftarkan diri ke Institusi Pendidikan yang anda pilih. Saat ini status anda sedang dalam pemeriksaan oleh Institusi Pendidikan.')
            // $('.ui.modal.tambah-universitas')
            //   .modal('hide');
            window.location.href = "kelompok_ta"
          } else if (data.body.success == false) {
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
