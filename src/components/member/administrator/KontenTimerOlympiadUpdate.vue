<template>
  <span>
    <div align="center" style="background: linear-gradient(to right, rgba(73,155,234,1) 0%, rgba(32,124,229,1) 100%);color:#FFFFFF;" class="ui segment grey-text"><i class="write icon"></i>Olympiad Timer Update</div>
    <div class="ui segment grey-text">
      <form class="ui form">
          <div class="ui grid">
            <div class="sixteen wide column">
              <div class="field" style="background-color: brown;padding: 1em;border-radius: 5px;">
                <h4 style="color: white;">Start Date</h4>
                <input id="datepicker" type="text" placeholder="Start Date of Olympiad" v-model="StartDate"/>
                <h4 style="color: white;">Start Time</h4>
                <input type="time" v-model="JamMulai" placeholder="example: 07:00"/>
              </div>
              <br>
              <div class="field" style="background-color: brown;padding: 1em;border-radius: 5px;">
                <h4 style="color: white;">End Date</h4>
                <input id="datepicker2" type="text" placeholder="End Date of Olympiad" v-model="EndDate"/>
                <h4 style="color: white;">End Time</h4>
                <input type="time" v-model="JamSelesai"/>
              </div>
            </div>
            <div class="sixteen wide column">
              <button  type="button" style="color: white; background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;" class="ui button" v-on:click.prevent="olympiad_timer_update">Create</button>
            </div>
          </div>
        </form>
    </div>
  </span>
</template>

<script>
  import global_json from '../../../assets/js/globalVariable.json';

  export default {
    name: "konten",
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
    data(){
      return{
        StartDate: '',
        JamMulai: '',
        EndDate: '',
        JamSelesai: ''
      }
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
