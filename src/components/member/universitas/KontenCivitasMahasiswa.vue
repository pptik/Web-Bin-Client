<template>
  <span>
    <div align="center" style="background: linear-gradient(141deg, #e74c3c 10%, #c0392b 51%, #c0392b 75%);color:#FFFFFF;" class="ui segment grey-text"><i class="user icon"></i><router-link class="white-text" to="/civitas">Civitas</router-link> / Mahasiswa</div>
    <div class="ui segment grey-text">
      <div class="sixteen wide column">
        <form class="ui form">
          <div class="field">
            <input type="text" placeholder="Tulis pencarian berdasarkan email" style="width:100%;" v-model="search"/>
          </div>
        </form>
      </div>
      <table class="ui fixed single line celled table" style="font-size: 0.6rem">
        <thead>
          <tr>
          <th>No</th>
          <th>Email</th>
          <th>Jenjang</th>
          <th>Prodi</th>
          <th>Status</th>
          <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mahasiswa, index in filteredMahasiswa">
            <td>{{index + 1}}</td>
            <td>{{mahasiswa.pengguna.email}}</td>
            <td>{{mahasiswa.jenjang.nama}}</td>
            <td>{{mahasiswa.prodi.nama}}</td>
            <td>
              <a class="ui yellow label" v-if="mahasiswa.status_konfirmasi == 0">Pending</a>
              <a class="ui green label" v-if="mahasiswa.status_konfirmasi == 1">Confirmed</a>
            </td>
            <td>
              <a class="ui blue label" v-if="mahasiswa.status_konfirmasi == 0" v-on:click.prevent="konfirmasi(mahasiswa._id)">Terima</a>
              <!--<router-link :to="`/civitas/mahasiswa/konfirmasi/${mahasiswa._id}`" class="ui blue label">Terima</router-link>-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </span>
</template>

<script>
  import global_json from '../../../assets/js/globalVariable.json';

  export default {
    name: "konten",
    created(){
      this.$http.post(global_json.general_url + '/institusi/daftar_mahasiswa', {
        access_token: this.$session.get('access_token'),
        universitas: this.$session.get('user_id')
      }).then(function (data) {
        if (data.body.success == true) {
          for(let a=0;a<data.body.data.data[0].civitas.mahasiswa.length;a++){
            this.daftar_mahasiswa.push(data.body.data.data[0].civitas.mahasiswa[a])
          }
        } else if (data.body.success == false) {
          console.log('M: Gagal mengembalikan daftar mahasiswa yang terdaftar dalam universitas')
        }
      });
    },
    data(){
      return{
        daftar_mahasiswa: [],
        search: '',
        id_mahasiswa_universitas: ''
      }
    },
    methods: {
      konfirmasi:function (mahasiswa) {
        this.id_mahasiswa_universitas = mahasiswa;
        console.log("Data: "+this.$session.get('access_token')+' '+this.$session.get('user_id')+' '+this.id_mahasiswa_universitas)
        this.$http.post(global_json.general_url + '/institusi/konfirmasi/mahasiswa', {
          access_token: this.$session.get('access_token'),
          universitas: this.$session.get('user_id'),
          mahasiswa_universitas: this.id_mahasiswa_universitas
        }).then(function (data) {
          if (data.body.success == true) {
            alert(data.body.data.message)
          } else if (data.body.success == false) {
            alert(data.body.data.message)
          }
        });
      }
    },
    computed: {
      filteredMahasiswa: function () {
        return this.daftar_mahasiswa.filter((mahasiswa) => {
          return mahasiswa.pengguna.email.match(this.search);
        })
      }
    }
  }
</script>

<style scoped>

</style>
