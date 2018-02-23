<template>
  <div class="ui grid stackable">
    <div align="center" class="seven wide column grey-text">
      <h3>Mahasiswa</h3>
      <p class="text-justify">Mulai pengerjaan Tugas Akhir sebagai mahasiswa. Setelah mengisi form pendaftaran diharuskan melakukan unggah Kartu Tanda Mahasiswa Institutsi Pendidikan yang dipilih untuk proses pemeriksaan.</p>
      <router-link to="/daftar/mahasiswa" style="background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;" class="big ui button">Mulai</router-link>
    </div>
    <div align="center" class="two wide column grey-text">
      <div class="ui vertical divider"><i class="circle thin icon"></i></div>
    </div>
    <div align="center" class="seven wide column grey-text">
      <h3>Dosen</h3>
      <p class="text-justify">Mulai kegiatan seputar Tugas Akhir sebagai dosen. Setelah mengisi form pendaftaran diharuskan melakukan unggah Kartu Tanda Pengajar Institusi Pendidikan yang dipilih untuk proses pemeriksaan.</p>
      <router-link to="/daftar/dosen" style="background: linear-gradient(141deg, #e74c3c 10%, #c0392b 51%, #c0392b 75%);color:#FFFFFF;" class="big ui button">Mulai</router-link>
    </div>
  </div>

</template>

<script>

  export default {
    name: "konten"
  }




</script>

<style scoped>

</style>
