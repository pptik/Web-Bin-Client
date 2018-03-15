<template>
  <nav class="ui segment">
    <div class="ui left pointing dropdown link item">
      <i class="book icon"></i>
      Materi
      <div class="menu">
        <div class="item"><router-link to="/admin/material" class="grey-text">Tambah Modul</router-link></div>
        <div class="item"><router-link to="/admin/video" class="grey-text">Tambah Video</router-link></div>
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
