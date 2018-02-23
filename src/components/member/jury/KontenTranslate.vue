<template>
  <span>
    <div align="center" style="background: linear-gradient(to right, rgba(73,155,234,1) 0%, rgba(32,124,229,1) 100%);color:#FFFFFF;" class="ui segment grey-text"><i class="write icon"></i>Translate</div>
    <div class="ui segment grey-text">
      <!--<form class="ui form">
          <div class="ui grid">
            <div class="eight wide column">
              <div class="field">
                <label>Question Number</label>
                <select class="ui dropdown">
                  <option>Select Question Number</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      <br>
      <br>-->
      <form class="ui form">
          <div class="ui grid">
            <div class="sixteen wide column">
              <div class="field">
                <label>Question Translated to your language</label>
                <ol>
                  <li v-for="tq in translated_question">
                    {{tq.deskripsi[0].pertanyaan}}
                  </li>
                </ol>
              </div>
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
        'language_code': '',
        'translated_question': []
      }
    },
    created(){
      //Mengambil kode bahasa negara
      this.$http.post(global_json.general_url + global_json.api.country_by_id, {
        SessID: 'opensession',
        CountryID: this.$session.get('country')
      }).then(function (data) {
        if (data.body.success == true) {

          this.language_code = data.body.countrydetail.kode_bahasa;

          //Mengambil soal translatean
          this.$http.post(global_json.general_url + global_json.api.translated_question, {
            SessID: 'opensession',
            LanguageCode: this.language_code
          }).then(function (data) {
            if (data.body.success == true) {
              //alert('Kode bahasa soal transte anx: '+JSON.stringify(this.language_code))
              this.translated_question = data.body.questionlist;

              console.log('TQ: '+JSON.stringify(data.body.questionlist))
            } else if (data.body.success == false) {
              console.log('M: Gagal mengembalikan translate question')
            }
          });

        } else if (data.body.success == false) {
          //console.log('M: Gagal mengembalikan kode bahasa negara')
        }
      });


    },
    methods: {
      add_moderation:function () {
        $('.ui.modal.add-moderation')
          .modal('show')
      }
    }
  }
</script>

<style scoped>

</style>
