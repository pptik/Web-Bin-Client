<template>
  <section class="ui container">
    <navigasi :highlight1="true" :highlight2="false" :highlight3="false"></navigasi>
    <div class="ui stackable sixteen column grid">
      <div class="three wide column">
        <div class="ui segment">
          <div class="ui middle aligned divided list">
            <div style="padding:1em;" class="item">
              <div class="content"></div><router-link to="/team_leader/grades" class="grey-text"><i class="newspaper icon"></i>Grades</router-link>
              <!--<div class="content"><router-link to="/administrator/users" class="grey-text"><i class="user icon"></i>Users</router-link></div>-->
            </div>
            <div style="padding:1em;" class="item">
              <div class="content"></div><router-link to="/team_leader/moderation" class="primarytext"><i class="talk outline icon"></i>Moderation</router-link>
              <!--<div class="content"><router-link to="/administrator/questions" class="grey-text"><i class="write icon"></i>Questions</router-link></div>-->
            </div>
            <div style="padding:1em;" class="item">
              <!--<div class="content"></div><router-link to="/administrator/moderation" class="grey-text"><i class="talk outline icon"></i>Moderation</router-link>-->
              <div class="content"><router-link to="/team_leader/accessing" class="grey-text"><i class="write icon"></i>Scoring</router-link></div>
            </div>
            <div style="padding:1em;" class="item">
              <!--<div class="content"></div><router-link to="/administrator/moderation" class="grey-text"><i class="talk outline icon"></i>Moderation</router-link>-->
              <div class="content"><router-link to="/team_leader/translate" class="grey-text"><i class="write icon"></i>Translate</router-link></div>
            </div>
          </div>
        </div>
      </div>
      <div class="ten wide column">
        <konten-utama></konten-utama>
      </div>
      <div class="three wide column">
        <div class="ui segment">
          <div class="ui middle aligned divided list">
            <div style="padding:1em;" class="item">
              <div class="content">You are logged as <b>{{username}}</b></div>
            </div>
          </div>
          <div class="ui middle aligned divided list">
            <div style="padding:1em;" class="item">
              <a href="#" v-on:click.prevent="create_moderation" class="content grey-text"><i class="add icon"></i>Propose Moderation</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hak-cipta></hak-cipta>
    <div class="ui modal create-moderation"><i class="close icon"></i>
      <div class="header">Propose Moderation</div>
      <div class="content">
        <form class="ui form">
          <div class="field">
            <label>Jury</label>
            <select class="ui dropdown" v-model="select_jury" id="select_option_jury">
              <option>Select Jury</option>
              <option v-for="jury in juries" :value="jury._id">
                {{jury.code}}
              </option>
            </select>
          </div>
          <div class="field">
            <label>Session</label>
            <select class="ui dropdown" v-model="sesi_dipilih">
              <option>Select Session Number</option>
              <option v-for="j in jumlah_sesi" :value="j.urutan">
                {{j.urutan}}
              </option>
            </select>
          </div>
          <div class="field">
            <button type="button"
                    style="background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;"
                    class="ui button" v-on:click.prevent="create_moderation_process">Propose</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
    import '../../../assets/js/slick.min.js'
    import Navigasi from './Navigasi';
    import KontenUtama from './KontenModeration';

    import global_json from '../../../assets/js/globalVariable.json';

    export default {
        name: "index",
        data(){
          return{
            username: this.$session.get('username'),
            ModerationScheduleID: '',
            juries: '',
            select_jury: '',
            jumlah_sesi: [],
            sesi_dipilih: ''
          }
        },
        created () {

          if(this.$session.get('user_role') != 1){
            alert("You have no permit to access this page")
            this.$router.push({path:'/'})
          }

          document.title = 'IOAA | Moderation';

          //Ambil moderasi yang aktif
          this.$http.post(global_json.general_url + global_json.api.moderation_schedule_active, {
            SessID: this.$session.get('sess_id')
          }).then(function (data) {
              this.ModerationScheduleID = data.body.schedule._id;
              for(var a=0;a<data.body.schedule.jumlah_sesi;a++){
                this.jumlah_sesi.push({'urutan':a+1})
              }
          });

          //Ambil pengguna sebagai juri
          this.$http.post(global_json.general_url + global_json.api.users_list_privilege, {
            SessID: this.$session.get('sess_id'),
            Privilege: 3
          }).then(function (data) {
            if (data.body.success == true) {
              this.juries = data.body.listuser;
            } else if (data.body.success == false) {
              console.log('M: Gagal mengembalikan daftar pengguna: '+JSON.stringify(data.body))
            }
          });

        },
        components: {
          'navigasi' : Navigasi,
          'konten-utama' : KontenUtama
        },
        methods: {
          create_moderation: function () {
            $('.ui.modal.create-moderation')
              .modal('show')
          },
          create_moderation_process: function () {
            this.$http.post(global_json.general_url+global_json.api.moderation_appointment,{
              SessID: this.$session.get('sess_id'),
              ModerationScheduleID: this.ModerationScheduleID,
              TeamLeaderID: this.$session.get('user_id'),
              TeamLeaderCode: this.$session.get('code'),
              JuryID: this.select_jury,
              JuryCode: $('#select_option_jury option:selected').text(),
              ModerationSession: this.sesi_dipilih
            }).then(function (data) {
              if(data.body.success == true){
                alert(data.body.message)
                //this.$router.push({path:'/team_leader/moderation'})
                this.$router.go('/team_leader/moderation')
                //window.location.href = "/team_leader/moderation"
              }else if(data.body.success == false){
                alert(data.body.message)
              }
            });
          }
        }
    }
</script>

<style>
  @import '../../../assets/css/custom.css';

</style>
