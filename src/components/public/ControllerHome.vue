<template>
</template>

<script>

    export default {
        name: "index",
        created () {
          //console.log('UT: '+this.$session.get('user_type'))
          if(this.$session.get('user_role') == 0){
            this.$router.push({path:'/home/administrator'})
          }if(this.$session.get('user_role') == 3){
            this.$router.push({path:'/home/jury'})
          }if(this.$session.get('user_role') == 1){
            this.$router.push({path:'/home/team_leader'})
          }if(this.$session.get('user_role') == 2){
            this.$router.push({path:'/home/participant'})
          }
        }
    }
</script>

<style>

</style>
