<template>
  <nav class="ui secondary pointing menu">
    <router-link to="/" class="item">
      <span v-bind:class="{primarytext:highlight1}">IOAA 2018</span>
    </router-link>
    <div class="right menu">
      <router-link to="/jury/profile" class="item">
        <span v-bind:class="{primarytext:highlight3}">Profil</span>
      </router-link>
      <a href="#" v-on:click.prevent="keluar" class="item grey-text">
        <aside>
          <span v-bind:class="{primarytext:highlight2}">Logout</span>
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
      }
    },
   data (){
     return{
      //highlight:false
     }
   },
    methods: {
      keluar:function () {
        this.$session.destroy()
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>

</style>
