<template>
  <div class="ui equal width grid">
    <div class="column">
      <div class="ui segment">
        <div class="ui middle aligned divided list">
          <div style="padding:1em;" class="item">
            <div class="content"><a href="#" class="grey-text"><i class="write icon"></i>Blog</a></div>
          </div>
          <div style="padding:1em;" class="item">
            <div class="content"><a href="#" class="grey-text"><i class="talk outline icon"></i>Forum</a></div>
          </div>
          <div style="padding:1em;" class="item">
            <div class="content"></div><a href="#" class="grey-text"><i class="user icon"></i>Portofolio</a>
          </div>
        </div>
      </div>
    </div>
    <div class="eight wide column">
      <span>
      <div align="center" style="background: linear-gradient(141deg, #e74c3c 10%, #c0392b 51%, #c0392b 75%);color:#FFFFFF;" class="ui segment grey-text"><i class="user icon"></i>Pengaturan Profil</div>
      <div class="ui segment grey-text">
        <form class="ui form">
          <div class="field">
            <label>Nama Lengkap</label>
            <input type="text" placeholder="Tulis nama lengkap disini." v-model="namaLengkap"/>
          </div>
          <div class="field">
            <label>Bio</label>
            <textarea placeholder="Tuliskan cerita singkat tentang Anda disini." v-model="bio"></textarea>
          </div>
          <div class="field">
            <button v-on:click.prevent="ubahProfil" type="button" style="background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;" class="ui button">Ubah Profil</button>
          </div>
        </form>
      </div>
      <br/>
      <div align="center" style="background: linear-gradient(141deg, #e74c3c 10%, #c0392b 51%, #c0392b 75%);color:#FFFFFF;" class="ui segment grey-text"><i class="lock icon"></i>Pengaturan Sandi</div>
      <div class="ui segment grey-text">
        <form class="ui form">
          <div class="field">
            <label>Sandi Lama</label>
            <input type="password" placeholder="Tulis sandi lama disini." v-model="sandi_lama"/>
          </div>
          <div class="field">
            <label>Sandi Baru</label>
            <input type="password" placeholder="Tulis sandi baru disini." v-model="sandi_baru"/>
          </div>
          <div class="field">
            <button v-on:click.prevent="ubahSandi" type="button" style="background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;" class="ui button">Ubah Sandi</button>
          </div>
        </form>
      </div>
    </span>
    </div>
    <div class="column">
      <div class="ui card">
        <div class="image"><img v-bind:src="fotoProfil"/></div>
        <div class="content"><a class="header">{{username}}</a>
          <div class="meta"><span class="date">{{namaLengkap}}</span></div>
          <div class="description">{{bio}}</div>
        </div>
        <!--
        <div class="extra content"><a href="/pengaturan"><i class="photo icon"></i>Ubah Foto Profil</a></div>
        -->
        <div class="extra content">
          <router-link to="/pengaturan">
            <i class="setting icon"></i>Pengaturan
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import global_json from '../../../assets/js/globalVariable.json';

  export default {
    name: "konten",
    created () {

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
    },
    data(){
      return{
        bio: '',
        sandi_lama: '',
        sandi_baru: '',
        username: '',
        namaLengkap: '',
        fotoProfil: ''

      }
    },
    methods: {
      ubahProfil:function () {
        this.$http.post(global_json.general_url+'/profil/ubah',{
          access_token: this.$session.get('access_token'),
          pengguna: this.$session.get('user_id'),
          nama_lengkap: this.namaLengkap,
          bio: this.bio
        }).then(function (data) {
          if(data.body.success == true){
            alert('Data profil anda berhasil diubah!')
            this.$router.push({path:'/pengaturan'})
          }else if(data.body.success == false){
            var pesan = '';
            //console.log('Kembalian: '+data.body.data.length)
            for(let a=0;a<data.body.data.length;a++){
              pesan += JSON.stringify(data.body.data[a].msg)+', ';
            }
            alert(pesan);
            //this.$router.push({path:'/pengaturan'})
          }
        });
      },
      ubahSandi:function () {
        this.$http.post(global_json.general_url+'/pengguna/ubah_sandi',{
          access_token: this.$session.get('access_token'),
          pengguna: this.$session.get('user_id'),
          sandi_lama: this.sandi_lama,
          sandi_baru: this.sandi_baru,
          email: this.$session.get('email')
        }).then(function (data) {
          if(data.body.success == true){
            alert('Sandi anda berhasil diubah!')
          }else if(data.body.success == false){
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
