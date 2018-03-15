<template>
  <span>
    <h1>Tambah Video</h1>
    <div v-if="loading" class="ui active inverted dimmer">
             <div class="ui text loader">Loading</div>
           </div>
    <div class="ui negative message" v-if="hasError">
          <p>{{errorText}}</p>
    </div>
    <div class="ui positive message" v-if="hasMessage">
          <p>{{messageText}}</p>
    </div>
    <form class="ui form">
    <div class="field">
          <div>Judul</div>
          <input type="text" autocomplete="title" placeholder="Tulis Judul" v-model="title"/>
        </div>
        <div class="field">
          <div>Deskripsi</div>
          <textarea  v-model="desc" name="comment" placeholder="Tulis Deksripsi" ></textarea>
        </div>
      <div>URL Video Youtube</div>
          <input type="text" autocomplete="title" placeholder="Tulis Judul" v-model="url"/>


      <br>
        <div class="container">
          <button v-on:click.prevent="kirimMateri" type="button" class="small ui blue button">Submit</button>
        </div>
    </form>
  </span>
</template>

<script>
  const {restAPI}=require('../../assets/js/setup');
  const {globalSetup}=require('../../assets/js/setup');

  export default {
    name: "konten",
    data(){
      return{
        errorText:'',
        hasError:false,
        nomor:1,
        loading:false,
        title:'',
        desc:'',
        hasMessage:false,
        messageText:'',
        url:'',
        urls:[]
      }
    },

    created(){

    },
    mounted() {
      this.reset();
    },
    methods: {
      reset() {
        // reset form to initial state
        this.hasError = false;
        this.title="";
        this.desc="";
      },
      kirimMateri(){
        this.loading=true;
        let errorCheck=false;
        this.hasMessage=false;
        if(this.title===""){
          errorCheck=true;
          this.hasError=true;
          this.errorText='Judul tidak boleh kosong';
        }
        if(this.desc===""){
          errorCheck=true;
          this.hasError=true;
          this.errorText='Silahkan isi deskripsi';
        }
        if(this.url===""){
          errorCheck=true;
          this.hasError=true;
          this.errorText='Silahkan tambah url';
        }
        this.urls.push(this.url);
        if(!errorCheck){
          this.loading=true;
          this.$http.post(restAPI.createmaerial,{
              Title: this.title,
              Desc:this.desc,
              Files: this.urls,
              Type:0
            },{
              headers:{
               access_token:this.$session.get('access_token')
              },
            }
          ).then(function (data) {
            console.log(data);
            if(data.body.success === true){
              this.hasMessage=true;
              this.messageText=data.body.rm;
              this.reset();
            }else if(data.body.success === false){
              this.hasError=true;
              this.errorText=data.body.rm;
            }
            this.loading=false;
          });
        }
      }
    }
  }
</script>

<style scoped>

</style>
