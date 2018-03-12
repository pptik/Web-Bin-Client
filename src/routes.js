import PublicHome from './components/public/HomeTemplate.vue';
import AdminHome from './components/administrator/HomeTemplate.vue';
import PublicSignin from './components/public/SigninTemplate.vue';
import PublicSignup from './components/public/SignupTemplate.vue';

export default
[
  {path:'/',component: PublicHome},
  {path:'/signin',component: PublicSignin},
  {path:'/signup',component: PublicSignup},
  {path:'/admin/home',component: AdminHome}

]
