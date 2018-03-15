import PublicHome from './components/public/HomeTemplate.vue';
import NotFound from './components/public/NotFoundTemplate.vue';
import AdminHome from './components/administrator/HomeTemplate.vue';
import AdminMaterial from './components/administrator/MaterialTemplate.vue';
import AdminVideo from './components/administrator/VideoTemplate.vue';
import PublicSignin from './components/public/SigninTemplate.vue';
import PublicSignup from './components/public/SignupTemplate.vue';

export default
[
  {path:'/',component: PublicHome},
  {path:'/signin',component: PublicSignin},
  {path:'/signup',component: PublicSignup},
  {path:'/notfound',component: NotFound},
  {path:'/admin/home',component: AdminHome},
  {path:'/admin/material',component: AdminMaterial},
  {path:'/admin/video',component: AdminVideo}

]
