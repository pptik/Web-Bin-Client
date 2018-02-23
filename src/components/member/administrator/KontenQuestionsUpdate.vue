<template>
  <span>
    <div align="center" style="background: linear-gradient(to right, rgba(73,155,234,1) 0%, rgba(32,124,229,1) 100%);color:#FFFFFF;" class="ui segment grey-text"><i class="write icon"></i>Update Question</div>
    <div class="ui segment grey-text">
        <form class="ui form">
          <div class="ui grid">
            <div class="eight wide column">
              <div class="field">
                <label>Question Number: {{question_number}}</label>
              </div>
            </div>
            <div class="sixteen wide column">
             <div class="field">
                <label>Question</label>
                <vue-editor v-model="question_description"></vue-editor>
              </div>
            </div>
            <!--<div class="sixteen wide column">
             <div class="field">
                <label>Stylus Area</label>
                <canvas id="sketchpad" height="100" style="border:1px solid #000000;width: 100%;"></canvas>
              </div>
            </div>-->
            <div class="sixteen wide column">
              <button  type="button" v-on:click.prevent="update_question" style="color: white; background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;" class="ui button">Update</button>
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
    data(){
      return{
        questionId : this.$route.params.id,
        question_description: '',
        question_number: ''
      }
    },
    created(){

      this.$http.post(global_json.general_url + global_json.api.questions_by_id, {
        SessID: 'opensession',
        QuestionID: this.questionId
      }).then(function (data) {
        if (data.body.success == true) {
          //console.log('question: '+JSON.stringify(data.body.detailquestion.nomor))
          this.question_number = data.body.detailquestion.nomor;
          this.question_description = data.body.detailquestion.deskripsi[0].pertanyaan;
        } else if (data.body.success == false) {
          console.log('M: Gagal mengembalikan pertanyaan: '+JSON.stringify(data.body))
        }
      });
    },
    components: {
      VueEditor
    },
    methods: {
      update_question:function () {

        this.$http.post(global_json.general_url+global_json.api.questions_update,{
          SessID: this.$session.get('sess_id'),
          QuestionID: this.questionId,
          EnglishQuestion: this.question_description
        }).then(function (data) {
          if(data.body.success == true){
            alert(data.body.message)
            this.$router.push({path:'/administrator/questions'})
            //window.location.href = "/administrator/questions"
          }else if(data.body.success == false){
            alert(data.body.message)
          }
        });

      }
    }
  }
</script>

<style scoped>

</style>
