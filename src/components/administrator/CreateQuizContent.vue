<template>
  <span>
    <h4>Tambah Kuis</h4>
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
          <input type="text" autocomplete="title" placeholder="Tulis Judul" v-model="title"/>
        </div>
        <div class="field">
          <div>Deskripsi Singkat</div>
          <input  v-model="desc" type="text" autocomplete="desc" placeholder="Tulis Deskripsi Singkat Mengenai Kuis" />
        </div>
      <div class="field">
          <div>Level</div>
          <input  v-model="desc" type="text" autocomplete="level" placeholder="0" style="width: 7%" />
        </div>



      <br>
        <div class="container">
          <button v-if="quizCreated" v-on:click.prevent="kirimMateri" type="button" class="small ui blue button">Submit</button>
          <button v-if="!quizCreated" type="button" class="small ui blue button">publish</button>
        </div>
    </form>


    <div class="ui container" v-if="quizCreated">
    <div class="ui horizontal divider">
      Daftar Soal
    </div>
      <button v-on:click.prevent="tambahSoal" type="button" class="small ui blue button">Tambah Soal</button>
    </div>



    <div class="ui modal">
  <i class="close icon"></i>
  <div class="header">
    Soal
  </div>

  <div class="modal-content">
    <form class="ui form">
      <div class="field">
        <input type="text" autocomplete="title" placeholder="Tulis Soal" v-model="title"/>
      </div>
      <div class="grouped fields" v-for="answer,key in answers">
        <div class="fields">
          <div class="one wide field">
            <div class="ui radio checkbox">
              <input type="radio" name="example2" v-model="correctAnswerKey"  :value="key">
              <label>&nbsp;</label>
            </div>
          </div>
          <div class="twelve wide field">
            <input type="text" v-model="answer.text" placeholder="Tulis Jawaban">
          </div>
          <div class="two wide field">
            <input type="text" v-model="answer.poin" placeholder="Tulis Jawaban">
          </div>
        </div>
      </div>

      <div class="container">
        <button v-on:click.prevent="tambahJawaban" type="button" class="small ui blue button">tambah jawaban</button>
      </div>
    </form>
  </div>

      <div class="actions">
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
        quizID:'',
        quizCreated:false,
        errorText:'',
        hasError:false,
        loading:false,
        hasMessage:false,
        messageText:'',
        title:'',
        desc:'',
        answers:[],
        correctAnswerKey:0,
      }
    },
    components: {
    },
    created(){

    },
    mounted() {
      this.reset();

    },
    methods: {
      tambahSoal(){
        $('.ui.modal')
          .modal('show')
        ;
      },tambahJawaban(){
        this.answers.push({text:'',correct:false,poin:0,question_id:''});
        console.log(this.answers);
        console.log(this.correctAnswerKey)
      },

      reset() {
        this.hasError = false;
      }
    }
  }
</script>

<style scoped>

</style>
