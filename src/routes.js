import PublicHome from './components/public/HomeTemplate.vue';
import NotFound from './components/public/NotFoundTemplate.vue';
import AdminHome from './components/administrator/HomeTemplate.vue';
import VideoUpload from './components/administrator/VideoUploadTemplate.vue';
import SuaraUpload from './components/administrator/SuaraTemplate.vue';
import AdminMaterial from './components/administrator/MaterialTemplate.vue';
import AdminEditMaterial from './components/administrator/EditMaterialTemplate.vue';
import AdminVideo from './components/administrator/VideoTemplate.vue';
import AdminCreateNews from './components/administrator/CreateNewsTemplate.vue';
import AdminCreateQuiz from './components/administrator/CreateQuizTemplate.vue';
import AdminDetailQuiz from './components/administrator/DetailQuizTemplate.vue';
import AdminMaterialList from './components/administrator/ListMaterialTemplate.vue';
import AdminQuizList from './components/administrator/ListQuizTemplate.vue';
import PublicHasil from './components/administrator/HasilTemplate.vue';
import PublicSignin from './components/public/SigninTemplate.vue';
import PublicSignup from './components/public/SignupTemplate.vue';
import PublicDaftar from './components/public/DaftarTemplate.vue';


export default
[
  {path:'/',component: PublicHome},
  {path:'/signin',component:  PublicSignin},
  {path:'/daftar',component:  PublicDaftar},
  {path:'/signup',component: PublicSignup},
  {path:'/notfound',component: NotFound},
  {path:'/admin/home',component: AdminHome},
  {path:'/admin/hasil',component: PublicHasil},
  {path:'/admin/VideoUp',component: VideoUpload},
  {path:'/admin/SuaraUp',component: SuaraUpload},
  {path:'/admin/material',component: AdminMaterial},
  {path:'/admin/material/edit/:MaterialID',component: AdminEditMaterial,props:true},
  {path:'/admin/material/list',component: AdminMaterialList},
  {path:'/admin/quiz/list',component: AdminQuizList},
  {path:'/admin/quiz/detail/:QuizID',component: AdminDetailQuiz,props:true},
  {path:'/admin/create/news',component: AdminCreateNews},
  {path:'/admin/create/quiz',component: AdminCreateQuiz},
  {path:'/admin/video',component: AdminVideo}

]
