<template>
  <section class="ui container">
    <navigation :highlight1="false" :highlight2="false" :highlight3="true"></navigation>
    <main class="ui segment" style='padding: 3em 4em 3em 4em;'>
     404 - NOT FOUND
    </main>
    <copyright></copyright>
  </section>
</template>

<script>
  import '../../assets/js/slick.min.js'

  export default {
    name: "index",
    created () {
      document.title = 'Badan Intelijen Nasional | NOT FOUND';
    },
    data(){
      return{

      }
    },
    beforeCreate:function () {
      if (this.$session.exists()){
        //go to home
      }
    },
    components: {
    }
  }
</script>

<style>
  @import '../../assets/css/custom.css';

</style>
