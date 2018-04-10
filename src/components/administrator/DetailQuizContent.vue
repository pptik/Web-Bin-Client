<template>
  <span>
    <h4>Detail Kuis</h4>
    <div v-if="loading" class="ui active inverted dimmer">
             <div class="ui text loader">Loading</div>
           </div>
    <div class="ui negative message" v-if="hasError">
          <p>{{errorText}}</p>
    </div>
    <div class="ui positive message" v-if="hasMessage">
          <p>{{messageText}}</p>
    </div>
    <form class="ui form span">
    <div class="field">
          <div>Judul</div>
          <input type="text" autocomplete="title" placeholder="Tulis Judul" v-model="quizTitle"/>
        </div>
        <div class="field">
          <div>Deskripsi Singkat</div>
          <input  v-model="quizDesc" type="text" autocomplete="desc" placeholder="Tulis Deskripsi Singkat Mengenai Kuis" />
        </div>
      <div class="field">
          <div>Level</div>
          <input  v-model="quizLevel" type="number" autocomplete="level" placeholder="0" style="width: 10%" />
        </div>



      <br>
        <div class="container">
          <button v-if="quizStatus===1000" v-on:click.prevent="buatKuis" type="button" class="small ui blue button">Submit</button>
          <button v-if="quizStatus!==1000" v-on:click.prevent="editKuis" type="button" class="small ui blue button">Edit</button>
          <button v-if="quizStatus===0" v-on:click.prevent="publishKuis" type="button" class="small ui green button">Publish</button>
          <button v-if="quizStatus===1" v-on:click.prevent="unpublishKuis" type="button" class="small ui yellow button">Batal Publish</button>
        </div>
    </form>
    <div class="ui container" v-if="quizStatus===0||quizStatus===1">
      <div class="ui horizontal divider">
        Daftar Soal
      </div>
      <button v-on:click.prevent="tambahSoal" type="button" class="small ui blue button">Tambah Soal</button>
      <div v-for="q,key in questionList" class="ui segment comments">
        <button v-on:click.prevent="deleteQuestion(q._id,key)" class="red circular ui icon button">
          <i class="icon eraser"></i>
        </button>
        <button v-on:click.prevent="detailQuestion(key)" class="blue circular ui icon button">
          <i class="icon edit"></i>
        </button>
        <div class="comment">
          <label>{{q.question}}</label>
        </div>
      </div>
    </div>


    <div class="ui modal">
      <i class="close icon"></i>
      <div class="header">
        Soal
      </div>
      <div class="modal-content">
        <form class="ui form">
          <div class="ui negative message" v-if="hasAnswerError">
            <p>{{answerErrorText}}</p>
          </div>
          <div class="field">
            <input type="text" autocomplete="title" placeholder="Tulis Soal" v-model="questionTitle"/>
          </div>
          <div class="grouped fields" v-for="answer,key in answers">
            <div class="fields">
              <div class="one wide field">
                <div class="ui radio checkbox">
                  <input type="radio" name="example2" v-model="correctAnswerKey" :value="key">
                  <label>&nbsp;</label>
                </div>
              </div>
              <div class="fourteen wide field">
                <input type="text" v-model="answer.text" placeholder="Tulis Jawaban">
              </div>
              <i class="delete icon" v-on:click="deleteAnswer(key)"></i>
            </div>
          </div>
          <div class="container">
            <button v-on:click.prevent="tambahJawaban" type="button" class="small ui blue button">tambah jawaban</button>
          </div>
        </form>
      </div>
      <div class="ui container">
        <div class="ui segment">
          <label>Masukan Poin Soal</label>
        <div class="ui input" style="width: 10%">
          <input type="number" v-model="questionPoin" autocomplete="poin"    placeholder="masukan poin soal">
        </div>
          <div v-if="editSoal===false"  v-on:click.prevent="simpanSoal" class="ui green floated right ok inverted button">
            Simpan Soal
          </div>
          <div v-if="editSoal===true" v-on:click.prevent="questionEdit" class="ui green floated right ok inverted button">
            Edit Soal
          </div>
        </div>
      </div>
    </div>
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
        quizID:this.$route.params.QuizID,
        quizStatus:1000,
        quizTitle:'',
        quizDesc:'',
        quizLevel:0,
        questionID:'',
        answers:[],
        questionList:[],
        questionTitle:'',
        questionPoin:0,
        errorText:'',
        answerErrorText:'',
        hasAnswerError:false,
        hasError:false,
        loading:false,
        hasMessage:false,
        messageText:'',
        correctAnswerKey:0,
        editSoal:false,
        questionKey:0
      }
    },
    components: {
    },
    created(){
      this.loadData()
    },
    mounted() {
      this.reset();

    },
    methods: {
      loadData(){
        console.log(this.quizID);
        this.$http.post(restAPI.detailquiz,
          {
            QuizID:this.quizID
          },{
            headers:{
              access_token:this.$session.get('access_token')
            },
          }
        ).then(function (data) {
          if(data.body.success === true){
            let results=data.body.results;
            this.quizStatus=results.status;
            this.quizTitle=results.title;
            this.quizDesc=results.desc;
            this.quizLevel=results.level;
            this.questionList=results.question_list;
            console.log(this.questionList);
          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
          }
          this.loading=false;
        });
      },
      buatKuis(){
        this.hasError=false;
        if(this.quizLevel===0||this.quizLevel===""){
          this.hasError=true;
          this.errorText="Silahkan isi level kuis";
        }
        if(this.quizDesc===''){
          this.hasError=true;
          this.errorText="Silahkan isi deskripsi singkat kuis";
        }
        if(this.quizTitle===''){
          this.hasError=true;
          this.errorText="Judul kuis tidak boleh kosong";
        }
        if(this.hasError===false){
          this.$http.post(restAPI.createquiz,{
              Title:this.quizTitle,
              Level:this.quizLevel,
              Desc:this.quizDesc
            }, {
            headers: {
              access_token: this.$session.get('access_token')
            },
            }
          ).then(function (data) {
            if(data.body.success === true){
              this.hasMessage=true;
              this.messageText=data.body.rm;
              let results=data.body.results;
              this.quizID=results._id;
              this.quizStatus=results.status;
            }else if(data.body.success === false){
              this.hasError=true;
              this.errorText=data.body.rm;
            }
          })
        }
      },
      editKuis(){
        this.hasError=false;
        if(this.quizLevel===0||this.quizLevel===""){
          this.hasError=true;
          this.errorText="Silahkan isi level kuis";
        }
        if(this.quizDesc===''){
          this.hasError=true;
          this.errorText="Silahkan isi deskripsi singkat kuis";
        }
        if(this.quizTitle===''){
          this.hasError=true;
          this.errorText="Judul kuis tidak boleh kosong";
        }
        if(this.hasError===false){
          this.$http.post(restAPI.updatequiz,{
            QuizID:this.quizID,
              Title:this.quizTitle,
              Level:this.quizLevel,
              Desc:this.quizDesc
            }, {
              headers: {
                access_token: this.$session.get('access_token')
              },
            }
          ).then(function (data) {
            if(data.body.success === true){
              this.hasMessage=true;
              this.messageText=data.body.rm;
              let results=data.body.results;
              this.quizID=results._id;
              this.quizStatus=results.status;
            }else if(data.body.success === false){
              this.hasError=true;
              this.errorText=data.body.rm;
            }
          })
        }
      },
      publishKuis(){
        this.hasError=false;
          this.$http.post(restAPI.publishquiz,{
            QuizID:this.quizID,
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
              this.quizStatus=data.body.results.status;
            }else if(data.body.success === false){
              this.hasError=true;
              this.errorText=data.body.rm;
            }
          })

      },
      unpublishKuis(){
        this.hasError=false;
        this.$http.post(restAPI.unpublishquiz,{
            QuizID:this.quizID,
          }, {
            headers: {
              access_token: this.$session.get('access_token')
            },
          }
        ).then(function (data) {
          if(data.body.success === true){
            this.hasMessage=true;
            this.messageText=data.body.rm;
            this.quizStatus=data.body.results.status;
          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
          }
        })
      },
      detailQuestion(Key){
        this.editSoal=true;
        this.questionKey=Key;
        this.hasError=false;
        this.hasAnswerError=false;
        this.questionID=this.questionList[Key]._id;
        this.answers=this.questionList[Key].multiple_choice;
        this.questionTitle=this.questionList[Key].question;
        this.questionPoin=this.questionList[Key].poin;
        for(let i=0;i<this.answers.length;i++){
          if(this.answers[i].correct){
            this.correctAnswerKey=i;
          }
        }
        $('.ui.modal').modal({closable:false})
          .modal('show')
        ;
      },
      tambahSoal(){
        this.editSoal=false;
        this.hasAnswerError=false;
        $('.ui.modal').modal({closable:false})
          .modal('show')
        ;
      },tambahJawaban(){
        this.answers.push({text:'',correct:false});
        console.log(this.answers);
        console.log(this.correctAnswerKey)
      },
      questionEdit(){
        this.hasAnswerError=false;
        if(this.answers.length<=1){
          this.hasAnswerError=true;
          this.answerErrorText="silahkan tambahkan pilihan ganda"
        }
        if(this.questionPoin<=0||this.questionPoin===""){
          this.hasAnswerError=true;
          this.answerErrorText="silahkan masukan poin"
        }
        if(this.questionTitle===""){
          this.hasAnswerError=true;
          this.answerErrorText="pertanyaan tidak boleh kosong"
        }
        if(this.hasAnswerError===false){
          for(let i=0;i<this.answers.length;i++){
            this.answers[i].correct=false;
          }
          this.answers[this.correctAnswerKey].correct=true;
          this.$http.post(restAPI.quizupdatequestion,{
              QuestionID:this.questionID,
              Question:this.questionTitle,
              Poin:this.questionPoin,
              MultipleChoice:this.answers
            }, {
              headers: {
                access_token: this.$session.get('access_token')
              },
            }
          ).then(function (data) {
            console.log(data);
            if(data.body.success === true){
              this.hasAnswerError=true;
              this.answerErrorText=data.body.rm;
              this.questionList[this.questionKey]=data.body.results;
            }else if(data.body.success === false){
              this.hasAnswerError=true;
              this.answerErrorText=data.body.rm;
            }
          })
        }
      },
      simpanSoal(){
        this.hasAnswerError=false;
        if(this.answers.length<=1){
          this.hasAnswerError=true;
          this.answerErrorText="silahkan tambahkan pilihan ganda"
        }
        if(this.questionPoin<=0||this.questionPoin===""){
          this.hasAnswerError=true;
          this.answerErrorText="silahkan masukan poin"
        }
        if(this.questionTitle===""){
          this.hasAnswerError=true;
          this.answerErrorText="pertanyaan tidak boleh kosong"
        }
        this.answers[this.correctAnswerKey].correct=true;
        if(this.hasAnswerError===false){
          this.$http.post(restAPI.quizcreatequestion,{
            QuizID:this.quizID,
            Question:this.questionTitle,
            Poin:this.questionPoin,
            MultipleChoice:this.answers
            }, {
              headers: {
                access_token: this.$session.get('access_token')
              },
            }
          ).then(function (data) {
            console.log(data);
            if(data.body.success === true){
              this.hasAnswerError=true;
              this.answerErrorText=data.body.rm;
            }else if(data.body.success === false){
              this.hasAnswerError=true;
              this.answerErrorText=data.body.rm;
            }
          })
        }
      },
      deleteQuestion(QuestionID,Key){
        this.hasError=false;
        this.$http.post(restAPI.deletequestion,{
            QuestionID:QuestionID,
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
            this.questionList.splice(Key,1);
          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
          }
        })
      },

      deleteAnswer(index){
        this.answers.splice(index,1);
      },
      reset() {
        this.hasError = false;
      }
    }
  }
</script>

<style scoped>

</style>
