<template>
  <span>
    <div align="center" style="background: linear-gradient(to right, rgba(73,155,234,1) 0%, rgba(32,124,229,1) 100%);color:#FFFFFF;" class="ui segment grey-text"><i class="write icon"></i>Question Answer Detail</div>
    <div class="ui segment grey-text">
      <form class="ui form">
          <div class="ui grid">
            <div class="eight wide column">
              <div class="field">
                <label>Participant Code</label>
                <select class="ui dropdown" v-model="select_participant" v-on:change="get_answer" id="select_option_participant">
                  <option>Select Participant Code</option>
                  <option v-for="participant in participants" :value="participant._id">
                    {{participant.code}}
                  </option>
                </select>
              </div>
            </div>

            <!--<div class="eight wide column">
              <label style="visibility: hidden">aa</label>
              <div class="ui accordion">
              <div class="title">
                <i class="dropdown icon"></i>
                Give score here
              </div>
              <div class="content">

              </div>
              </div>
            </div>-->

          </div>

        </form>

      <table class="ui compact celled striped table" style="font-size: 0.8rem">
          <thead>
            <tr>
              <th>Question Number</th>
              <th>Problem</th>
              <th>Participant's Answer</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="qa in questions_aswers">
              <td>{{qa.nomor}}</td>
              <td>{{qa.deskripsi[0].pertanyaan}}</td>
              <td>
                <span v-for="(j,index) in qa.jawaban">
                  answer {{index+1}}: {{j.jawaban_participant}}
                  <br>
                </span>
              </td>
              <td>
                <form class="ui form">
                  <div class="eight wide column">
                    <div class="field">
                      <input type="number" placeholder="Score for the answer" v-model="grade"/>
                      <br>
                      <br>
                      <button type="button"
                              style="background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;"
                              v-on:click.prevent="save_score(qa._id,qa.nomor)" class="mini ui button button-submit">Save</button>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
  </span>
</template>

<script>
  import global_json from '../../../assets/js/globalVariable.json';

  export default {
    name: "konten",
    data(){
      return{
        participants: [],
        select_participant: '',
        grade: '',
        questions_aswers: []
      }
    },
    mounted(){
      $('.ui.accordion')
        .accordion()
      ;
    },
    created(){
      this.$http.post(global_json.general_url + global_json.api.users_list_privilege, {
        SessID: this.$session.get('sess_id'),
        Privilege: 2
      }).then(function (data) {
        if (data.body.success == true) {
          //console.log('users: '+JSON.stringify(data.body))
          this.participants = data.body.listuser;
          //console.log('grades: '+JSON.stringify(data.body.listgrade))
        } else if (data.body.success == false) {
          //console.log('M: Gagal mengembalikan daftar pengguna: '+JSON.stringify(data.body))
        }
      });
    },
    methods: {
      get_answer:function () {
        this.$http.post(global_json.general_url + global_json.api.questions_answer_participant, {
          SessID: this.$session.get('sess_id'),
          ParticipantID: this.select_participant
        }).then(function (data) {
          if (data.body.success == true) {

            this.questions_aswers = data.body.questionlist;
            //console.log('M: Berhasil mengembalikan daftar questions answers: '+JSON.stringify(data.body.questionlist))
          } else if (data.body.success == false) {
            //console.log('M: Gagal mengembalikan daftar questions answers: '+JSON.stringify(data.body))
          }
        });
      },
      save_score: function (questionId, questionNumber) {

        this.$http.post(global_json.general_url + global_json.api.grades_jury, {
          SessID: this.$session.get('sess_id'),
          QuestionID: questionId,
          ParticipantID: this.select_participant,
          JuryID: this.$session.get('user_id'),
          Grades:this.grade,
          QuestionNumber:questionNumber,
          JuryCode:this.$session.get('code'),
          ParticipantCode: $('#select_option_participant option:selected').text()
        }).then(function (data) {
          alert(data.body.message)
          /*if (data.body.success == true) {
            alert(data.body.message)
          } else if (data.body.success == false) {
          }*/
        });

      }
    }
  }
</script>

<style scoped>

</style>
