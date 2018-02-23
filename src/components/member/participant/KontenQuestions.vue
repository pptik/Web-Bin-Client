<template>
  <span>
    <div align="center" style="background: linear-gradient(to right, rgba(73,155,234,1) 0%, rgba(32,124,229,1) 100%);color:#FFFFFF;" class="ui segment grey-text"><i class="write icon"></i>Questions</div>
    <div class="ui segment grey-text">
        <form class="ui form">
          <div class="ui grid" v-if="examStatus == true">
            <div class="eight wide column">
              <div class="field">
                <label>Question Number</label>
                <select class="ui dropdown" v-model="select_question_number" v-on:change="get_question_detail">
                    <option>Select Question Number</option>
                    <option v-for="question in questions" :value="question._id">{{question.nomor}}</option>
                </select>
              </div>
            </div>
            <div class="sixteen wide column">
             <div class="field">
                <label>Question</label>
                <span v-html="question_detail">

                </span>
              </div>
            </div>
            <div class="sixteen wide column">
             <div class="field">
                <label>Answer</label>
                <vue-editor v-model="ParticipantAnswer"></vue-editor>
              </div>
            </div>
            <!--
            <div class="sixteen wide column">
             <div class="field">
                <label>Stylus Area</label>
                <canvas id="sketchpad" height="100" style="border:1px solid #000000;width: 100%;"></canvas>
              </div>
            </div>
            -->
            <div class="sixteen wide column">
              <button  type="button" style="color: white; background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;" class="ui button" v-on:click="submit_question">Submit</button>
            </div>
          </div>
          <div class="ui grid" v-else-if="examStatus == false">
            <div class="sixteen wide column" >
              Not in time to take an exam.
            </div>
          </div>
        </form>
    </div>
  </span>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  import moment from 'moment'
  import global_json from '../../../assets/js/globalVariable.json';


  export default {
    name: "konten",
    created(){
      //Mengambil pertanyaan
      this.$http.post(global_json.general_url + global_json.api.questions_active_list, {
        SessID: 'opensession'
      }).then(function (data) {
        if (data.body.success == true) {
          this.questions = data.body.listQuestions;
          //console.log("DP: "+JSON.stringify(data.body.listQuestions))
        } else if (data.body.success == false) {
          //console.log('M: Gagal mengembalikan daftar pengguna: '+JSON.stringify(data.body))
        }
      });

      //Mengambil exam timer
      this.$http.post(global_json.general_url + global_json.api.exam_timer, {
        SessID: 'opensession'
      }).then(function (data) {
        if (data.body.success == true) {
          //moment(data.body.schedule.start_time).format('MM-DD-YYYY HH:mm');
          this.dateStartExamTimer = data.body.detailexamtimers.TanggalMulaiExam;
          this.dateEndExamTimer = data.body.detailexamtimers.TanggalSelesaiExam;
          this.timeStartExamTimer = data.body.detailexamtimers.WaktuMulaiExam;
          this.timeEndExamTimer = data.body.detailexamtimers.WaktuSelesaiExam;
          this.startExamTimer = data.body.detailexamtimers.start_time;
          this.endExamTimer = data.body.detailexamtimers.end_time;
          //this.examStatus = moment().isBetween(data.body.detailexamtimers.start_time,data.body.detailexamtimers.end_time);
          //console.log("DP: "+JSON.stringify(data.body.listQuestions))
        } else if (data.body.success == false) {
          //console.log('M: Gagal mengembalikan daftar pengguna: '+JSON.stringify(data.body))
        }
      });

      //Mengambil status exam timer
      this.$http.post(global_json.general_url + global_json.api.cek_exam_timer, {
        SessID: 'opensession'
      }).then(function (data) {
        this.examStatus = data.body.success
      });

    },
    mounted() {
      // Variables for referencing the canvas and 2dcanvas context
      var canvas,ctx;

      // Variables to keep track of the mouse position and left-button status
      var mouseX,mouseY,mouseDown=0;

      // Draws a dot at a specific position on the supplied canvas name
      // Parameters are: A canvas context, the x position, the y position, the size of the dot
      function drawDot(ctx,x,y,size) {
        // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
        var r=0; var g=0; var b=0; var a=255;

        // Select a fill style
        ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";

        // Draw a filled circle
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
      }

      // Clear the canvas context using the canvas width and height
      function clearCanvas(canvas,ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      // Keep track of the mouse button being pressed and draw a dot at current location
      function sketchpad_mouseDown() {
        mouseDown=1;
        drawDot(ctx,mouseX,mouseY,1);
      }

      // Keep track of the mouse button being released
      function sketchpad_mouseUp() {
        mouseDown=0;
      }

      // Keep track of the mouse position and draw a dot if mouse button is currently pressed
      function sketchpad_mouseMove(e) {
        // Update the mouse co-ordinates when moved
        getMousePos(e);

        // Draw a dot if the mouse button is currently being pressed
        if (mouseDown==1) {
          drawDot(ctx,mouseX,mouseY,2);
        }
      }

      // Get the current mouse position relative to the top-left of the canvas
      function getMousePos(e) {
        if (!e)
          var e = event;

        if (e.offsetX) {
          mouseX = e.offsetX;
          mouseY = e.offsetY;
        }
        else if (e.layerX) {
          mouseX = e.layerX;
          mouseY = e.layerY;
        }
      }

      // Set-up the canvas and add our event handlers after the page has loaded
      function init() {
        // Get the specific canvas element from the HTML document
        canvas = document.getElementById('sketchpad');

        // If the browser supports the canvas tag, get the 2d drawing context for this canvas
        if (canvas.getContext)
          ctx = canvas.getContext('2d');

        // Check that we have a valid context to draw on/with before adding event handlers
        if (ctx) {
          canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
          canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
          window.addEventListener('mouseup', sketchpad_mouseUp, false);
        }
      }

      init();

    },
    components: {
      VueEditor
    },
    data(){
      return{
        select_question_number: '',
        question_detail: '',
        questions: [],
        QuestionID: this.select_question_number,
        ParticipantAnswer: '',
        startExamTimer: '',
        endExamTimer: '',
        dateStartExamTimer: '',
        dateEndExamTimer: '',
        timeStartExamTimer: '',
        timeEndExamTimer: '',
        examStatus: ''
      }
    },
    methods: {
      //Mengambil detail pertanyaan
      get_question_detail:function () {
        this.$http.post(global_json.general_url + global_json.api.questions_by_id, {
          SessID: 'opensession',
          QuestionID: this.select_question_number
        }).then(function (data) {
          if (data.body.success == true) {
            this.question_detail = data.body.detailquestion.deskripsi[0].pertanyaan
            //console.log("DQ: "+JSON.stringify(this.question_detail))
          } else if (data.body.success == false) {
            //console.log('M: Gagal mengembalikan daftar pengguna: '+JSON.stringify(data.body))
          }
        });
      },
      submit_question: function () {//Menjawab pertanyaan
        this.$http.post(global_json.general_url + global_json.api.participant_answering_question, {
          SessID: this.$session.get('sess_id'),
          QuestionID: this.select_question_number,
          ParticipantID: this.$session.get('user_id'),
          ParticipantAnswer: this.ParticipantAnswer
        }).then(function (data) {
          alert(JSON.stringify(data.body.message))
        });
      }
    }
  }
</script>

<style scoped>

</style>
