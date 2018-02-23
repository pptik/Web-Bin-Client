<template>
  <span>
    <div align="center" style="background: linear-gradient(to right, rgba(73,155,234,1) 0%, rgba(32,124,229,1) 100%);color:#FFFFFF;" class="ui segment grey-text"><i class="list icon"></i>Questions List</div>
    <div class="ui segment grey-text">
        <!--<form class="ui form">
          <div class="ui grid">
            <div class="eight wide column">
              <div class="field">
                <label>Question Number</label>
                <input type="text" placeholder="Name" v-model="input_question_number"/>
              </div>
            </div>
            <div class="eight wide column">
             <div class="field">
                <label>Language</label>
                <select class="ui dropdown">
                    <option>Select Language</option>
                </select>
              </div>
            </div>
          </div>
        </form>-->
        <table class="ui compact table" style="font-size: 0.8rem">
        <thead>
          <tr>
            <th>Question Number</th>
            <th>Question in English</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="question in questions">
            <td>{{question.nomor}}</td>
            <td><span v-bind:id="question._id">{{question.deskripsi[0].pertanyaan}}</span></td>
            <td><a :href="'/administrator/questions/update/'+question._id">Update</a> | <a href="#" v-on:click.prevent="delete_question_process(question._id)">Delete</a></td>
          </tr>
        </tbody>
      </table>

    </div>
    <div class="ui modal update-question"><i class="close icon"></i>
      <div class="header">Update Question</div>
      <div class="content">
        <form class="ui form">
          <div class="field">
            <label>Question Number</label>
            <input type="text" value="" readonly/>
          </div>
          <div class="field">
            <button type="button"
                    style="background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;"
                    class="ui button" v-on:click.prevent="update_question_process">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </span>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  import global_json from '../../../assets/js/globalVariable.json';


  export default {
    name: "konten",
    created(){
      //Daftar pertanyaan

      this.$http.post(global_json.general_url + global_json.api.questions_active_list, {
        SessID: 'opensession'
      }).then(function (data) {
        if (data.body.success == true) {
          this.questions = data.body.listQuestions;
          console.log('questions: '+JSON.stringify(data.body.listQuestions))
        } else if (data.body.success == false) {
          console.log('M: Gagal mengembalikan daftar pertanyaan: '+JSON.stringify(data.body))
        }
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

      //init();

    },
    components: {
      VueEditor
    },
    data(){
      return{
        email: '',
        sandi: '',
        input_question_number: '',
        input_question: '',
        questions: []
      }
    },
    methods: {
      create_question:function () {

        this.$http.post(global_json.general_url+global_json.api.create_question,{
          SessID: this.$session.get('sess_id'),
          Number: this.input_question_number,
          Description: this.input_question
        }).then(function (data) {
          if(data.body.success == true){
            console.log('DK: '+JSON.stringify(data));
            alert(data.body.message)
            this.$router.go('/administrator/questions')
            //this.$router.push({path:'/administrator/questions'})
            //window.location.href = "/administrator/questions"
          }else if(data.body.success == false){
            alert(data.body.message)
            //this.$router.push({path:'/login'})
          }
        });

      },
      delete_question_process: function (question) {
        //console.log('SessID: '+this.$session.get('sess_id'));
        //console.log('QuestionID: '+question);
        this.$http.post(global_json.general_url+global_json.api.delete_question,{
          SessID: this.$session.get('sess_id'),
          QuestionID: question
        }).then(function (data) {
          if(data.body.success == true){
            //alert('SessID: '+this.$session.get('sess_id')+'QID: '+question)
            //this.$router.push({path:'/home'})
            alert(data.body.message)
            this.$router.go('/administrator/questions')
            //window.location.href = "/administrator/questions"
          }else if(data.body.success == false){
            alert(data.body.message)
            //this.$router.push({path:'/login'})
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
