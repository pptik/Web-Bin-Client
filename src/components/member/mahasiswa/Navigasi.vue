<template>
  <nav class="ui secondary pointing menu">
    <router-link to="/" class="item">
      <span v-bind:class="{primarytext:highlight1}">Tugas Akhir Dalam Jaringan</span>
    </router-link>
    <router-link to="/kelompok_ta" class="item">
      <span v-bind:class="{primarytext:highlight2}">Kelompok TA</span>
    </router-link>
    <div class="right menu">
      <router-link to="/pengaturan" class="item grey-text">
        <aside>
          <span v-bind:class="{primarytext:highlight3}">Pengaturan</span>
        </aside>
      </router-link>
      <a href="#" v-on:click.prevent="keluar" class="item grey-text">
        <aside>
          <span v-bind:class="{primarytext:highlight4}">Keluar</span>
        </aside>
      </a>
    </div>
  </nav>
</template>

<script>
  export default {
    props: {
      highlight1: {
        type: Boolean,
        required: true
      },
      highlight2: {
        type: Boolean,
        required: true
      },
      highlight3: {
        type: Boolean,
        required: true
      },
      highlight4: {
        type: Boolean,
        required: true
      },
      highlight5: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      keluar:function () {
        this.$session.destroy()
        this.$router.push('/')
      }
    },
   data (){
     return{
      //highlight:false
     }
   }
  }
</script>

<style scoped>

</style>
