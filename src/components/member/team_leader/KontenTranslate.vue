<template>
  <span>
    <div align="center" style="background: linear-gradient(to right, rgba(73,155,234,1) 0%, rgba(32,124,229,1) 100%);color:#FFFFFF;" class="ui segment grey-text"><i class="write icon"></i>Translate</div>
    <div class="ui segment grey-text">
      <form class="ui form">
          <div class="ui grid">
            <div class="sixteen wide column">
              <div class="field">
                <label>Question Number</label>
                <select class="ui dropdown" v-model="select_question_number" v-on:change="get_detail_question">
                  <option>Select Question Number</option>
                  <option v-for="question in questions" :value="question._id">{{question.nomor}}</option>
                </select>
              </div>
             <div class="field">
                <label>Question in English</label>
                <section v-html="question_eng_detail">
                </section>
              </div>
            </div>
          </div>
        </form>
      <br>
      <form class="ui form">
          <div class="ui grid">
            <div class="sixteen wide column"><div class="field">
                <label>Your translation to your Language </label>
                <vue-editor v-model="language_translate"></vue-editor>
              </div></div>
            <div class="sixteen wide column">
              <button  v-on:click.prevent="translate_to_tl_language" type="button" style="color: white; background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;" class="ui button"><i class="send outline icon"></i>Submit</button>
              <button  v-on:click.prevent="get_translate_language" type="button" style="background: linear-gradient(141deg, #e74c3c 10%, #c0392b 51%, #c0392b 75%);color:#FFFFFF;" class="ui button"><i class="write icon"></i>Use Translate Helper</button>
            </div>
          </div>
        </form>
    </div>

  </span>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  import global_json from '../../../assets/js/globalVariable.json';

  export default {
    name: "konten",
    components: {
      VueEditor
    },
    data(){
      return{
        questions : [],
        select_question_number: '',
        question_eng_detail: '',
        language_name: '',
        language_code: '',
        language_translate: ''
      }
    },
    created() {
      //Mengambil pertanyaan
      this.$http.post(global_json.general_url + global_json.api.questions_active_list, {
        SessID: 'opensession'
      }).then(function (data) {
        if (data.body.success == true) {

          this.questions = data.body.listQuestions;
        } else if (data.body.success == false) {
          //console.log('M: Gagal mengembalikan daftar pengguna: '+JSON.stringify(data.body))
        }
      });

      //Mengambil kode bahasa negara
      this.$http.post(global_json.general_url + global_json.api.country_by_id, {
        SessID: 'opensession',
        CountryID: this.$session.get('country')
      }).then(function (data) {
        if (data.body.success == true) {
          this.language_name = data.body.countrydetail.bahasa;
          this.language_code = data.body.countrydetail.kode_bahasa;
        } else if (data.body.success == false) {
          console.log('M: Gagal mengembalikan kode bahasa negara')
        }
      });
    },
    methods: {
      get_detail_question:function (){
        this.$http.post(global_json.general_url + global_json.api.questions_by_id, {
          SessID: 'opensession',
          QuestionID: this.select_question_number
        }).then(function (data) {
          if (data.body.success == true) {
            //console.log('users: '+JSON.stringify(data.body))
            this.question_eng_detail = data.body.detailquestion.deskripsi[0].pertanyaan;
            //console.log('DPX: '+JSON.stringify(data.body.listQuestions))//
            //console.log('grades: '+JSON.stringify(data.body.listgrade))
          } else if (data.body.success == false) {
            //console.log('M: Gagal mengembalikan daftar pengguna: '+JSON.stringify(data.body))
          }
        });
      },
      get_translate_language: function () {
        this.$http.post(global_json.general_url + global_json.api.translate_from_english, {
          SessID: 'opensession',
          OriginalText: this.question_eng_detail,
          RequestedLanguage: this.language_code
        }).then(function (data) {
          if (data.body.success == true) {
            //console.log('users: '+JSON.stringify(data.body))
            this.language_translate = data.body.translated;
            //console.log('DPX: '+JSON.stringify(data.body.listQuestions))//
            //console.log('grades: '+JSON.stringify(data.body.listgrade))
          } else if (data.body.success == false) {
            //console.log('M: Gagal mengembalikan daftar pengguna: '+JSON.stringify(data.body))
          }
        });
      },
      translate_to_tl_language: function () {
        this.$http.post(global_json.general_url + global_json.api.translate_question_to_tl_language, {
          SessID: 'opensession',
          QuestionID: this.select_question_number,
          Language: this.language_name,
          LanguageCode: this.language_code ,
          TranslatedQuestion: this.language_translate
        }).then(function (data) {
          alert(data.body.message)
        });
      }
    }
  }
</script>

<style scoped>

</style>
