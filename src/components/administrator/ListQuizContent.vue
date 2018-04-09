<template>
  <span>
    <h1>Quiz List</h1>
    <div v-if="loading" class="ui active inverted dimmer">
             <div class="ui text loader">Loading</div>
           </div>
    <div class="ui negative message" v-if="hasError">
          <p>{{errorText}}</p>
    </div>
    <div class="ui positive message" v-if="hasMessage">
          <p>{{messageText}}</p>
    </div>
    <div v-for="quiz,key in quizList" class="ui segment comments">
      <a v-if="quiz.status===1" class="ui green ribbon label">Published</a>

      <div class="comment">
        <h4>{{quiz.title}}</h4>
        <div class="content">
          <div class="text">
            Deskripsi : {{quiz.desc}}
          </div>
          <div class="text">
            Level : {{quiz.level}}
          </div>
          <a class="author">Dibuat oleh : {{quiz.post_by.username}}</a>
          <div class="metadata">
            <span class="date">Tanggal : {{quiz.created_at_string}} </span>
          </div>
          <div class="ui bottom right attached label">
            <a v-if="quiz.status===0" v-on:click.prevent="publishKuis(quiz._id,key)" class="ui green label">
            <i class="paper plane icon"></i><label>Publish</label>
          </a>
          <a v-if="quiz.status===1" v-on:click.prevent="unpublishKuis(quiz._id,key)" class="ui yellow label">
            <label>Unpublish</label>
          </a>
          <a :href="'/admin/quiz/detail/'+quiz._id" class="ui blue label">
            <i class="pencil alternate"></i><label>Detail</label>
          </a>
          </div>
        </div>
      </div>
    </div>


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
        quizList:[],
        tempQuizList:[],
        noMore:false
      }
    },

    created(){
      this.loadQuizzes();
    },
    mounted() {
      this.reset();
    },
    methods: {
      loadQuizzes(){
        this.$http.post(restAPI.allquizlist,{},{
            headers:{
              access_token:this.$session.get('access_token')
            },
          }
        ).then(function (data) {
          if(data.body.success === true){
            let results=data.body.results;
            if(results.length>0){
              this.quizList=this.quizList.concat(results);
              this.reset();
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
      publishKuis(QuizID,key){
        this.hasError=false;
        this.$http.post(restAPI.publishquiz,{
            QuizID:QuizID,
          }, {
            headers: {
              access_token: this.$session.get('access_token')
            },
          }
        ).then(function (data) {
          console.log(data);
          if(data.body.success === true){
            this.hasMessage=true;
            this.messageText=data.body.rm;
            this.quizList[key].status=data.body.results.status;
          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
          }
        })
      },
      unpublishKuis(QuizID,key){
        this.hasError=false;
        this.$http.post(restAPI.unpublishquiz,{
            QuizID:QuizID,
          }, {
            headers: {
              access_token: this.$session.get('access_token')
            },
          }
        ).then(function (data) {
          console.log(data);
          if(data.body.success === true){
            this.hasMessage=true;
            this.messageText=data.body.rm;
            this.quizList[key].status=data.body.results.status;
          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
          }
        })
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
