<template>
  <span>
    <div align="center" style="background: linear-gradient(to right, rgba(73,155,234,1) 0%, rgba(32,124,229,1) 100%);color:#FFFFFF;" class="ui segment grey-text"><i class="hourglass end icon"></i>Olympiad Timer</div>
    <div class="ui segment grey-text">
      <table class="ui compact table" style="font-size: 0.8rem">
        <thead>
          <tr>
            <th>Start time</th>
            <th>End time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{TanggalMulaiExam}}, {{WaktuMulaiExam}}</td>
            <td>{{TanggalSelesaiExam}}, {{WaktuSelesaiExam}}</td>
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
        end_time: '',
        start_time: '',
        TanggalMulaiExam: '',
        TanggalSelesaiExam: '',
        WaktuMulaiExam: '',
        WaktuSelesaiExam: ''
      }
    },
    created(){
      this.$http.post(global_json.general_url + global_json.api.olympiad_timer, {
        SessID: 'opensession'
      }).then(function (data) {
        this.end_time = data.body.detailexamtimers.end_time;
        this.start_time = data.body.detailexamtimers.start_time;
        this.TanggalMulaiExam = data.body.detailexamtimers.TanggalMulaiExam;
        this.TanggalSelesaiExam = data.body.detailexamtimers.TanggalSelesaiExam;
        this.WaktuMulaiExam = data.body.detailexamtimers.WaktuMulaiExam;
        this.WaktuSelesaiExam = data.body.detailexamtimers.WaktuSelesaiExam;
      });
    },
    mounted(){
      $( "#datepicker" ).datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '2018:2019'
      });

      $( "#datepicker2" ).datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '2018:2019'
      });
    },
    methods: {
      olympiad_timer_update:function () { //olympiad_timer_update
        var startDate = $('#datepicker').val().split('/');
        var endDate = $('#datepicker2').val().split('/');

        this.$http.post(global_json.general_url + global_json.api.olympiad_timer_update, {
          SessID: 'opensession',
          StartDate: startDate[1]+'/'+startDate[0]+'/'+startDate[2],
          JamMulai: this.JamMulai,
          EndDate: endDate[1]+'/'+endDate[0]+'/'+endDate[2],
          JamSelesai: this.JamSelesai
        }).then(function (data) {
          alert(data.body.message);
          this.$router.push({path:'/administrator/timer_olympiad'})
          //window.location.href = "/administrator/timer_olympiad"
        });
      }
    }
  }
</script>

<style scoped>

</style>
