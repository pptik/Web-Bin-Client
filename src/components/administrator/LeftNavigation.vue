<template>
  <nav class="ui middle aligned divided list ">
    <div class="ui left pointing dropdown link item">
      <i class="book icon large">Materi  </i>

      <div class="menu">
        <div class="item"><router-link to="/admin/material/list" class="grey-text">List</router-link></div>
        <div class="item"><router-link to="/admin/material" class="grey-text">Tambah Modul</router-link></div>
        <div class="item"><router-link to="/admin/video" class="grey-text">Tambah Video</router-link></div>
      </div>

    </div>
    <div class="ui left pointing dropdown link item">
      <i class="newspaper icon large">Berita</i>

      <div class="menu">
        <div class="item"><router-link to="/admin/create/news" class="grey-text">Tambah Berita</router-link></div>
      </div>
    </div>

  </nav>
</template>

<script>
  export default {
    mounted(){
      $('.ui.dropdown')
        .dropdown();
    },
   data (){
     return{
      //highlight:false
     }
   },
    methods: {

    }
  }
</script>

<style scoped>

</style>
