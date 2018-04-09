<template>
  <span>
    <h1>Material List</h1>
    <div v-if="loading" class="ui active inverted dimmer">
             <div class="ui text loader">Loading</div>
           </div>
    <div class="ui negative message" v-if="hasError">
          <p>{{errorText}}</p>
    </div>
    <div class="ui positive message" v-if="hasMessage">
          <p>{{messageText}}</p>
    </div>

    <div v-for="material,key in materialList" class="ui segment comments">
      <h3>{{material.title}}</h3>
      <div class="comment">
        <a class="avatar">
      <img v-bind:src="material.user_detail.display_picture">
    </a>
      <div class="content">
      <a class="author">{{material.post_by.username}}</a>
      <div class="metadata">
        <span class="date">{{material.created_at_string}} </span>
      </div>
      <div v-if="!material.loadmore" class="text">
{{material.synopsis}}....
        <br/>
        <button v-on:click.prevent="readMore(key)" class="astext"><b>Read More...</b></button>
      </div>
      <div v-if="material.loadmore" class="text">
{{material.desc}}
        <br/>
        <div v-if="material.type===1" v-for="file,fileKey in material.files" class="ui bulleted list">
           <a class="item" v-bind:href="file.http_path" target="_blank" >{{file.originalname}}</a>
        </div>
        <div v-if="material.type===2" v-for="file,fileKey in material.files" class="ui bulleted list">
           <a class="item" v-bind:href="file.http_path" target="_blank" >{{file.originalname}}</a>
        </div>
        <iframe v-if="material.type===0" width="560" height="315" v-bind:src="material.files[0]" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <button v-on:click.prevent="readLess(key)" class="astext"><b>Read Less...</b></button>
      </div>
        <a class="ui red label">
 <i class="angle down icon"></i><label>{{material.downvote}}</label>
</a>
 <a class="ui green label">
 <i class="angle up icon"></i><label>{{material.upvote}}</label>
</a>
 <a class="ui yellow label">
 <i class="star outline icon" ></i><label>{{material.favorite}}</label>
</a>
 <a class="ui red label" v-on:click.prevent="deleteMateri(material._id,key)">
 <i class="eraser icon"></i><label>Delete</label>
</a>
 <a :href="'/admin/material/edit/'+material._id" class="ui blue label">
 <i class="pencil alternate"></i><label>edit</label>
</a>

    </div>
      </div>


    </div>


     <button v-if="materialList.length>0" :disabled="noMore== true" v-on:click.prevent="loadMateri()" class="ui button blue" style="width: 100%"><b>Load More</b></button>


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
        loading:false,
        title:'',
        desc:'',
        hasMessage:false,
        messageText:'',
        skip:0,
        materialList:[],
        tempMaterialList:[],
        noMore:false
      }
    },

    created(){
      this.loadMateri();
    },
    mounted() {
      this.reset();
    },
    methods: {
      deleteMateri(MaterialID,key){
        this.$http.post(restAPI.deletematerial,{
            MaterialID:MaterialID
          },{
            headers:{
              access_token:this.$session.get('access_token')
            },
          }
        ).then(function (data) {
          if(data.body.success === true){
            this.hasMessage=true;
            this.messageText=data.body.rm;
            this.materialList.splice(key,1);
          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
          }
          this.loading=false;
        });
      },
      readMore(index){
        this.materialList[index].loadmore=true;
      },
      readLess(index){
        this.materialList[index].loadmore=false;
      },
      loadMateri(){
       // this.loading=true;
        this.$http.post(restAPI.materiallist,{
            Skip:this.skip
          },{
            headers:{
              access_token:this.$session.get('access_token')
            },
          }
        ).then(function (data) {

          if(data.body.success === true){
            let results=data.body.results;
            if(results.length>0){
              this.materialList=this.materialList.concat(results);
              this.reset();
              this.skip=this.skip+5;
              if (results.length<5){
                this.noMore=true;
              }
            }

            if(results.length===0){
              this.noMore=true;
            }
          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
          }
          this.loading=false;
        });
      },
      reset() {
        // reset form to initial state
        this.hasError = false;
        this.title="";
        this.desc="";
      }
    }
  }
</script>

<style scoped>
  .astext {
    background:none;
    border:none;
    margin:0;
    padding:0;
  }
</style>
