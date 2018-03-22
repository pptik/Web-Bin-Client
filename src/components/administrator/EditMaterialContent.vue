<template>
  <span>
 <h1>Edit Modul</h1>
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
      <div v-if="isVideo">URL Video Youtube</div>
          <input v-if="isVideo" type="text" autocomplete="title" placeholder="Tulis Judul" v-model="url"/>
      <div v-if="!isVideo" class="field">
        <select v-model="modulType">
  <option disabled value="">Pilih Tipe Modul</option>
  <option value="1">Suplemen</option>
  <option value="2">Kasus</option>
</select>
      </div>
      <div  class="ui positive message" v-if="hasUpload||!isVideo">
      <p>Attachment</p>
      <ul id="example-1">
        <li v-for="(file,index) in uploadedFiles">

 <a class="item" v-bind:href="file.http_path" target="_blank" >{{file.originalname}}</a>

  <i class="delete icon" v-on:click="deleteFile(index)"></i>

        </li>
      </ul>
    </div>
       <div class="container">
      <!--UPLOAD-->
      <form v-if="!isVideo" enctype="multipart/form-data">
        <label>Upload files</label>
        <div class="dropbox">
          <input v-if="!loading" type="file" multiple :name="uploadFieldName"  @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="application/pdf,application/vnd.ms-excel" class="input-file">
          Drag your file(s) here to begin<br> or click to browse
        </div>
      </form>
  </div>
      <br>
        <div class="container">
          <button v-on:click.prevent="updateMateri" type="button" class="small ui blue button">Update</button>
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
        MaterialID : this.$route.params.MaterialID,
        errorText:'',
        hasError:false,
        hasUpload:false,
        uploadedFiles: [],
        uploadError: null,
        uploadFieldName: 'docFile',
        loading:false,
        title:'',
        desc:'',
        hasMessage:false,
        messageText:'',
        modulType:'',
        isVideo:false,
        url:''
      }
    },

    created(){
      this.loadDetailMateri();
    },
    mounted() {

    },
    methods: {
      reset() {
        // reset form to initial state
        this.uploadedFiles = [];
      },
      loadDetailMateri(){
        this.$http.post(restAPI.detailmaterial,{
            MaterialID:this.MaterialID
          },{
            headers:{
              access_token:this.$session.get('access_token')
            },
          }
        ).then(function (data) {

          if(data.body.success === true){
            let results=data.body.results;
            console.log(results);
            this.hasMessage=true;
            this.messageText=data.body.rm;
            this.title=results.title;
            this.desc=results.desc;
            if(results.type===0){
              this.isVideo=true;
              this.modulType=0;
              if(results.files.length>0){
                this.url=results.files[0]
              }
            }else {
              this.uploadedFiles=results.files;
              if(this.uploadedFiles.length>0){
                this.hasUpload=true;
              }
              this.modulType=(results.type).toString();
            }

          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
          }
          this.loading=false;
        });
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
        this.$http.post(restAPI.uploadFile,formData
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
      updateMateri(){
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
        if(this.modulType===""){
          errorCheck=true;
          this.hasError=true;
          this.errorText='Silahkan pilih tipe modul';
        }
        if(this.isVideo){
          if(this.url===""){
            errorCheck=true;
            this.hasError=true;
            this.errorText='Silahkan tambah url';
          }
          this.uploadedFiles.push(this.url);
        }

        if(!errorCheck){
          this.loading=true;
          this.$http.post(restAPI.updatematerial,{
            MaterialID:this.MaterialID,
              Title: this.title,
              Desc:this.desc,
              Files: this.uploadedFiles,
              Type:this.modulType
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
