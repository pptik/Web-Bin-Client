<template>
  <span>
    <div align="center" style="background: linear-gradient(to right, rgba(73,155,234,1) 0%, rgba(32,124,229,1) 100%);color:#FFFFFF;" class="ui segment grey-text"><i class="users icon"></i>Users List</div>
    <div class="ui segment grey-text">
        <!--<form class="ui form">
          <div class="field">
            <select class="ui dropdown" v-model="search">
                <option>Select Privilege here to filter the list</option>
                <option>Jury</option>
                <option>Participant</option>
                <option>Team Leader</option>
            </select>
          </div>
        </form>-->
        <table class="ui compact table" style="font-size: 0.8rem">
        <thead>
          <tr>
            <th>Privilege</th>
            <th>Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Code</th>
            <th>Gender</th>
            <th>Salutation</th>
            <th>Birthday</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users">
            <td>
              <span v-if="user.privilege == 0">Administrator</span>
              <span v-if="user.privilege == 1">Team Leader</span>
              <span v-if="user.privilege == 2">Partcipant</span>
              <span v-if="user.privilege == 3">Jury</span>
            </td>
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
            <td>{{user.country_detail.nama}}</td>
            <td>{{user.code}}</td>
            <td>{{user.gender}}</td>
            <td>{{user.salutation}}</td>
            <td>{{user.birthday}}</td>
          </tr>
        </tbody>
      </table>

    </div>
    <div align="center" style="background: linear-gradient(to right, rgba(73,155,234,1) 0%, rgba(32,124,229,1) 100%);color:#FFFFFF;" class="ui segment grey-text"><i class="flag outline icon"></i>Countries List</div>
    <div class="ui segment grey-text">
      <table class="ui compact table" style="font-size: 0.8rem">
        <thead>
          <tr>
            <th>Country Name</th>
            <th>Country Code</th>
            <th>Country Language</th>
            <th>Country Language Code</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="country in countries">
            <td>{{country.nama}}</td>
            <td>{{country.kode_negara}}</td>
            <td>{{country.bahasa}}</td>
            <td>{{country.kode_bahasa}}</td>
            <td>{{country.jenis}}</td>
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
    created(){
      //Daftar pengguna
      this.$http.post(global_json.general_url + global_json.api.users_list, {
        SessID: this.$session.get('sess_id')
      }).then(function (data) {
        if (data.body.success == true) {
          this.users = data.body.listuser;
        } else if (data.body.success == false) {
          console.log('M: Gagal mengembalikan daftar pengguna: '+JSON.stringify(data.body))
        }
      });

      //Daftar negara
      this.$http.post(global_json.general_url + global_json.api.countries_list, {
        SessID: this.$session.get('sess_id')
      }).then(function (data) {
        if (data.body.success == true) {
          this.countries = data.body.listcountry;
        } else if (data.body.success == false) {
          console.log('M: Gagal mengembalikan daftar negara: '+JSON.stringify(data.body))
        }
      });
    },
    data(){
      return{
        email: '',
        sandi: '',
        search: '',
        users: [],
        countries: []
      }
    },
    methods: {
      masuk:function () {

      }
    },
    computed: {
    /*filteredUsers: function () {
      return this.users.filter((user) => {
        return user.privilege.match(this.search);
      })
    }*/
  }
  }
</script>

<style scoped>

</style>
