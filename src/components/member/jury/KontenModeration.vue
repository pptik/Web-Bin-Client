<template>
  <span>
    <div align="center" style="background: linear-gradient(to right, rgba(73,155,234,1) 0%, rgba(32,124,229,1) 100%);color:#FFFFFF;" class="ui segment grey-text"><i class="info icon"></i>Moderation Schedule</div>
    <div class="ui segment grey-text">
        <ul>
            <li>Start Time: {{moderationStartTime}}</li>
            <li>End Time: {{moderationEndTime}}</li>
            <li>Number of Session: {{sumOfSession}}</li>
            <li>Minutes per Session: {{timePerSession}}</li>
        </ul>
        <table class="ui compact celled striped table" style="font-size: 0.8rem">
          <thead>
            <tr>
              <th>Session</th>
              <th>Team Leader & Jury</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(moderation,index) in moderationSessions">
              <td>{{moderation.sesi}}</td>
              <td>
                Team Leader: {{moderation.kode_team_leader}}
                <br/>
                Jury: {{moderation.kode_juri}}
              </td>
            </tr>
          </tbody>
        </table>
    </div>
  </span>
</template>

<script>
  import global_json from '../../../assets/js/globalVariable.json';
  import moment from 'moment'

  export default {
    name: "konten",
    data(){
      return{
        moderationStartTime: '',
        moderationEndTime: '',
        moderationDuration: '',
        moderationSessionNumbers: '',
        moderationId: '',
        moderationSessions: [],
        sumOfSession: '',
        timePerSession: ''
      }
    },
    created(){
      //Schedule active moderation
      this.$http.post(global_json.general_url + global_json.api.moderation_schedule_active, {
        SessID: this.$session.get('sess_id')
      }).then(function (data) {
        if(data.body.schedule != null){
          this.moderationStartTime = moment(data.body.schedule.start_time).format('MM-DD-YYYY HH:mm');
          this.moderationEndTime = moment(data.body.schedule.end_time).format('MM-DD-YYYY HH:mm');
          this.moderationDuration = data.body.schedule.durasi;
          this.moderationSessionNumbers = data.body.schedule.jumlah_sesi;
          this.moderationId = data.body.schedule._id;
          this.sumOfSession = data.body.schedule.jumlah_sesi;
          this.timePerSession = data.body.schedule.durasi;
          for(var a=0;a<data.body.schedule.listModerasi.length;a++){
            this.moderationSessions.push({kode_team_leader: data.body.schedule.listModerasi[a].kode_team_leader, kode_juri: data.body.schedule.listModerasi[a].kode_juri, sesi: data.body.schedule.listModerasi[a].sesike})
          }
          /*for(var a=1;a<=Object.keys(data.body.schedule.k_sesi).length;a++){
            this.moderationSessions.push(data.body.schedule.k_sesi[a])
          }*/

        }
      });
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
