<template>
  <section class="ui container">
    <navigasi :highlight1="true" :highlight2="false"></navigasi>
    <div class="ui stackable sixteen column grid">
      <div class="three wide column">
        <div class="ui segment">
          <div class="ui middle aligned divided list">
            <div style="padding:1em;" class="item">
              <div class="content"><router-link to="/administrator/users" class="primarytext"><i class="user icon"></i>Users</router-link></div>
            </div>
            <div style="padding:1em;" class="item">
              <div class="content"><router-link to="/administrator/questions" class="grey-text"><i class="write icon"></i>Questions</router-link></div>
            </div>
            <div style="padding:1em;" class="item">
              <div class="content"></div><router-link to="/administrator/moderation" class="grey-text"><i class="talk outline icon"></i>Moderation</router-link>
            </div>
            <div style="padding:1em;" class="item">
              <div class="content"></div><router-link to="/administrator/grades" class="grey-text"><i class="newspaper icon"></i>Grades</router-link>
            </div>
            <div style="padding:1em;" class="item">
              <div class="content"></div><router-link to="/administrator/timer_olympiad" class="grey-text"><i class="hourglass end icon"></i>Timer Olympiad</router-link>
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
            <div style="padding:1em;" class="item">
              <a href="#" v-on:click.prevent="create_user" class="content grey-text"><i class="add icon"></i>Create User</a>
            </div>
            <div style="padding:1em;" class="item">
              <a href="#" v-on:click.prevent="create_country" class="content grey-text"><i class="add icon"></i>Create Country</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hak-cipta></hak-cipta>
    <div class="ui modal create-user"><i class="close icon"></i>
      <div class="header">Create User</div>
      <div class="content">
        <form class="ui form">
          <div class="field">
            <label>Privilege</label>
            <select class="ui dropdown" v-model="select_privilege">
              <option value="">Select Privilege</option>
              <option value="3">Jury</option>
              <option value="2">Participant</option>
              <option value="1">Team Leader</option>
            </select>
          </div>
          <div class="field">
            <label>Name</label>
            <input type="text" placeholder="Name" v-model="input_name"/>
          </div>
          <div class="field">
            <label>Email</label>
            <input type="email" placeholder="Email" v-model="input_email"/>
          </div>
          <div class="field">
            <label>Country</label>
            <select class="ui dropdown" v-model="select_country">
              <option>Select Country</option>
              <option value="5a66cd98de2c61277c23fadd">Indonesia</option>
            </select>
          </div>
          <div class="field">
            <label>Code</label>
            <input type="text" placeholder="Code" v-model="input_code"/>
          </div>
          <div class="field">
            <label>Gender</label>
            <select class="ui dropdown" v-model="select_gender">
              <option>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div class="field">
            <label>Salutation</label>
            <select class="ui dropdown" v-model="select_salutation">
              <option>Select Salutation</option>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Mrs.">Mrs.</option>
            </select>
          </div>
          <div class="field">
            <label>Birthday</label>
            <input type="text" placeholder="Birthday" id="datepicker" v-model="input_birthday"/>
          </div>
          <div class="field">
            <button type="button"
                    style="background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;"
                    class="ui button" v-on:click.prevent="create_user_process">Submit</button>
          </div>
        </form>
      </div>
    </div>
    <div class="ui modal create-country"><i class="close icon"></i>
      <div class="header">Create Country</div>
      <div class="content">
        <form class="ui form">
          <div class="field">
            <label>Country Name</label>
            <input type="text" placeholder="Country Name" v-model="input_country_name"/>
          </div>
          <div class="field">
            <label>Country Code</label>
            <input type="text" placeholder="Country Code" v-model="input_country_code"/>
          </div>
          <div class="field">
            <label>Country Language</label>
            <input type="text" placeholder="Country Language" v-model="input_language"/>
          </div>
          <div class="field">
            <label>Country Language Code</label>
            <input type="text" placeholder="Country Language Code" v-model="input_language_code"/>
          </div>
          <div class="field">
            <label>Type</label>
            <select class="ui dropdown" v-model="select_type">
              <option>Select Type</option>
              <option>Main</option>
            </select>
          </div>
          <div class="field">
            <button type="button"
                    style="background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;"
                    class="ui button" v-on:click.prevent="create_country_process">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
    import '../../../assets/js/slick.min.js'
    import Navigasi from './Navigasi';
    import KontenUtama from './KontenUsers';

    import global_json from '../../../assets/js/globalVariable.json';



    export default {
        name: "index",
        data(){
        return{
          input_email: '',
          input_code: '',
          input_birthday: '',
          input_name: '',
          input_country_name: '',
          input_country_code: '',
          input_type: '',
          select_type: '',
          input_language: '',
          input_language_code: '',
          select_privilege: '',
          select_country: '',
          select_gender: '',
          select_salutation: '',
          username: this.$session.get('username')
        }
      },
        created () {

          if(this.$session.get('user_role') != 0){
            alert("You have no permit to access this page")
            this.$router.push({path:'/'})
          }

          document.title = 'IOAA | Home';
        },
        mounted(){
          $( "#datepicker" ).datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1930:2010'
          });
        },
        methods : {
          create_user: function () {
            $('.ui.modal.create-user')
              .modal('show')
          },
          create_country: function () {
            $('.ui.modal.create-country')
              .modal('show')
          },
          create_user_process: function () {
            var datePicker=$("#datepicker").val();
            //this.dt=dd;  // I don't like this way...
            //console.log('bIRth: ')
            //console.log(datePicker, this.input_birthday);
            //console.log(datePicker);

            this.$http.post(global_json.general_url+global_json.api.create_user,{
              SessID: this.$session.get('sess_id'),
              Name: this.input_name,
              CountryID: this.select_country,
              Code: this.input_code,
              Gender: this.select_gender,
              Salutation: this.select_salutation,
              Email: this.input_email,
              BirthDay: datePicker,
              Privilege: this.select_privilege
            }).then(function (data) {
              if(data.body.success == true){
                console.log('DK: '+JSON.stringify(data));
                alert(data.body.message)
                //this.$router.push({path:'/administrator/users'})
                this.$router.go('/administrator/users')
                //window.location.href = "/administrator/users"
              }else if(data.body.success == false){
                alert(data.body.message)
                //this.$router.push({path:'/login'})
              }
            });
          },
          create_country_process: function () {
            this.$http.post(global_json.general_url+global_json.api.create_country,{
              SessID: this.$session.get('sess_id'),
              Name: this.input_country_name,
              CountryCode: this.input_country_code,
              Language: this.input_language,
              LanguageCode: this.input_language_code,
              Type: this.select_type
            }).then(function (data) {
              if(data.body.success == true){
                //console.log('DK: '+JSON.stringify(data));
                alert(data.body.message)
                //this.$router.push({path:'/home'})
                this.$router.go('/administrator/users')
                //this.$router.push({path:'/administrator/users'})
                //window.location.href = "/administrator/users"
              }else if(data.body.success == false){
                alert(data.body.message)
                //this.$router.push({path:'/login'})
              }
            });
          }
        },
        components: {
          'navigasi' : Navigasi,
          'konten-utama' : KontenUtama
        }
    }
</script>

<style>
  @import '../../../assets/css/custom.css';

</style>
