<template>
  <span>
    <h1>Buat Berita</h1>
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
          <div>Sinopsis</div>
          <textarea  v-model="desc" name="comment" placeholder="Tulis Deksripsi" rows="3" ></textarea>
        </div>
     <div class="field">
       <label>Konten</label>
       <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded" v-model="content">
    </vue-editor>

     </div>
      <div class="container">
          <button v-on:click.prevent="kirimNews" type="button" class="small ui blue button">Submit</button>
        </div>
    </form>
  </span>
</template>

<script>
  const {restAPI}=require('../../assets/js/setup');
  const {globalSetup}=require('../../assets/js/setup');
  import { VueEditor } from 'vue2-editor'
  export default {
    name: "konten",
    data(){
      return{
        errorText:'',
        hasError:false,
        loading:false,
        hasMessage:false,
        messageText:'',
        title:'',
        content:'',
        desc:''
      }
    },
    components: {
      VueEditor
    },
    created(){

    },
    mounted() {
      this.reset();
    },
    methods: {
      kirimNews(){
        this.loading=true;
        let errorCheck=false;
        this.hasMessage=false;
        this.hasError=false;
        if(this.title===""){
          errorCheck=true;
          this.hasError=true;
          this.errorText='Judul tidak boleh kosong';
        }
        if(this.content===""){
          errorCheck=true;
          this.hasError=true;
          this.errorText='Konten tidak boleh kosong';
        }
        if(this.desc===""){
          errorCheck=true;
          this.hasError=true;
          this.errorText='Silahkan Isi Deskripsi Singkat';
        }

        if(!errorCheck){
          this.loading=true;
          this.$http.post(restAPI.createnews,{
              Title: this.title,
              Content:this.content,
            Desc:this.desc
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

      },
      handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        let formData = new FormData();
        this.loading=true;
        this.hasMessage=false;
        this.hasError=false;
        formData.append('docFile', file);
        this.$http.post(restAPI.uploadFile,formData
        ).then(function (data) {
          console.log(data);
          if(data.body.success === true){
            let url = data.body.results.http_path;
            Editor.insertEmbed(cursorLocation, 'image', url);
            this.loading=false;
            resetUploader();
          }else {
            this.loading=false;
            this.hasError=true;
            this.errorText="Gagal Mengupload Gambar";
          }
        }).catch(err=>{
          console.log(err);
          this.loading=false;
          this.hasError=true;
          this.errorText="server not responding, please try again";
        });
      }
    ,
      reset() {
        // reset form to initial state
        this.title='';
          this.content='';
          this.desc='';
        this.hasError = false;
      }
    }
  }
</script>

<style scoped>

</style>
