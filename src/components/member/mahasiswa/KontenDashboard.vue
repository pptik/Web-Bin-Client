<template>
  <span>
    <div align="center" style="background: linear-gradient(141deg, #e74c3c 10%, #c0392b 51%, #c0392b 75%);color:#FFFFFF;" class="ui segment grey-text"><i class="info icon"></i>Informasi</div>
    <div class="ui segment grey-text">
      <p>
        Untuk mahasiswa yang mengambil TA 1 tahun ajaran 2017/2018 semester genap, silahkan ikuti langkah berikut untuk melakukan kegiatan TA nya di TADJ:
      </p>
      <ol>
        <li>Pilih menu Kelompok TA</li>
        <li>Pilih universitas anda mengambil TA</li>
        <li>Apabila belum ada data universitas atau ingin menambahkan universitas. Silahkan pilih tambah universitas.</li>
        <li>Pilih universitas yang ingin ditambahkan beserta dengan jenjang dan prodinya.</li>
        <li>Apabila sudah diterima maka anda dapat menuju menu kelompok untuk mengambil kelompok.</li>
        <li>Ambil judul TA dengan filter judul tahun ajaran 2017/2018 semester genap.</li>
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
        this.$http.post(global_json.general_url+'/masuk',{
          email: this.email,
          sandi: this.sandi
        }).then(function (data) {
          if(data.body.success == true){
            this.$session.set('username',data.body.data.data.username)
            this.$router.push({path:'/masuk'})
            console.log('Session username: '+this.$session.get('username'))
          }else if(data.body.success == false){
            alert(data.body.data.message)
            //this.$router.push({path:'/masuk'})
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
