<template>
  <span>
    <div align="center" style="background: linear-gradient(to right, rgba(73,155,234,1) 0%, rgba(32,124,229,1) 100%);color:#FFFFFF;" class="ui segment grey-text"><i class="info icon"></i>Grades List</div>
    <div class="ui segment grey-text">
        <table class="ui compact table" style="font-size: 0.8rem">
          <thead>
            <tr>
              <th>Participant</th>
              <th>Question Number</th>
              <th>Scores</th>
              <th>Difference Scores</th>
              <th>Final Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="grade in grades">
              <td>{{grade.kode_participant}}</td>
              <td>{{grade.nomor_soal}}</td>
              <td>
                Juries:
                <ol>
                  <li v-for="g in grade.nilai_juri">{{g.kode_juri}}, score: {{g.nilai}}</li>
                </ol>
                Team Leader:
                {{grade.nilai_team_leader.kode_team_leader}}, score: {{grade.nilai_team_leader.nilai}}
              </td>
              <td>{{grade.selisih}}</td>
              <td>{{grade.nilai_final}}</td>
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
        grades:[]
      }
    },
    created(){
      this.$http.post(global_json.general_url + global_json.api.grades_list, {
        SessID: this.$session.get('sess_id')
      }).then(function (data) {
        if (data.body.success == true) {
          console.log('grades: '+JSON.stringify(data.body))
          this.grades = data.body.listgrade;
          //console.log('grades: '+JSON.stringify(data.body.listgrade))
        } else if (data.body.success == false) {
          console.log('M: Gagal mengembalikan daftar nilai: '+JSON.stringify(data.body))
        }
      });
    },
    methods: {
      masuk:function () {

      }
    }
  }
</script>

<style scoped>

</style>
