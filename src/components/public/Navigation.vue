<!--<template>
  <nav class="ui fixed menu">
    <router-link to="/" class="item">
      <span v-bind:class="{primarytext:highlight1}">Bin Administration Web</span>
    </router-link>
    <div class="right menu">
      <router-link to="/signup" class="item">
        <aside>
          <span v-bind:class="{primarytext:highlight2}">
            Daftar
          </span>
        </aside>
      </router-link>
      <router-link to="/signin" class="item">
        <aside>
          <span v-bind:class="{primarytext:highlight3}">
            Masuk
          </span>
        </aside>
      </router-link>
    </div>
  </nav>
</template>
-->
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
   }
  }
</script>

<style scoped>

</style>
