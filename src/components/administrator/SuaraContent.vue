<template>
  <span>
    <h1>Audio Analisis</h1>
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
      <!-- <div class="field">
         <select v-model="modulType">
   <option disabled value="">Pilih Tipe Modul</option>
   <option value="1">Suplemen</option>
   <option value="2">Kasus</option>
 </select>
       </div>-->
      <div class="ui positive message" v-if="hasUpload">
      <p>File yang teelah diupload</p>
      <ul id="example-1">

        <li v-for="(file,index) in uploadedFiles">
                  {{ file.originalname }}==>ftp://filehosting.pptik.id/nib/audio/{{ file.originalname }}
  <i class="delete icon" v-on:click="deleteFile(index)"> </i>

        </li>
      </ul>
    </div>
       <div class="container">
      <!--UPLOAD-->
      <form enctype="multipart/form-data">
        <label>Upload files</label>
        <div class="dropbox"><input v-if="!loading" type="file" multiple :name="uploadFieldName"  @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="audio/*" class="input-file">
          Drag your file(s) here to begin<br> or click to browse
        </div>
      </form>
  </div>
      <br>
        <div class="container">
          <button v-on:click.prevent="kirimImage" type="button" class="small ui blue button">Analisis</button>
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
        hasUpload:true,
        uploadedFiles: [],
        uploadError: null,
        uploadFieldName: 'audioFile',
        loading:false,
        title:'',
        desc:'',
        hasMessage:false,
        messageText:'',
        modulType:''
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
        this.uploadedFiles = [];
        this.uploadError = null;
        this.hasError = false;
        this.hasUpload = false;
        this.title="";
        this.desc="";
      },
      filesChange(fieldName, fileList) {
        this.hasMessage=false;
        this.loading=true;
        this.hasError=false;
        const formData = new FormData();
        if (!fileList.length) return;
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });

        // save it
        this.save(formData);

      },
      save(formData) {
        // upload data to the server
        this.$http.post(restAPI.uploadFilesuara,formData
        ).then(function (data) {
          console.log(data);
          if(data.body.success === true){
            this.hasUpload=true;
            this.uploadedFiles.push(data.body.results);
          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
          }
          this.loading=false;
        }).catch(err=>{
          console.log(err);
          this.loading=false;
          this.hasError=true;
          this.errorText="server not responding, please try again";
        });

      },
      kirimImage(){
        this.loading=true;
        let errorCheck=false;
        this.hasMessage=false;
        this.hasError=false;
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
        if(!errorCheck){
          this.loading=true;
          this.$http.post(restAPI.createImage,{
              Title: this.title,
              Desc:this.desc,
              Files: this.uploadedFiles,
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
      deleteFile(index){
        this.uploadedFiles.splice(index,1);
      }
    }
  }
</script>

<style scoped>
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 50px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 50px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>
