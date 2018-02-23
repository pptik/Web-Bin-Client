import PublicIndex from './components/public/BungkusIndex.vue';
import PublicMasuk from './components/public/BungkusMasuk.vue';
import PublicDaftar from './components/public/BungkusDaftar.vue';
import ControllerHome from './components/public/ControllerHome.vue';
import AdministratorHome from './components/member/administrator/BungkusHome.vue';
import SahabatBawasluHome from './components/member/team_leader/BungkusHome.vue';

export default [
  {path:'/',component: PublicIndex},
  {path:'/signin',component: PublicMasuk},
  {path:'/signup',component: PublicDaftar},
  {path:'/home', component: ControllerHome},
  {path:'/home/administrator', component: AdministratorHome},
  {path:'/home/sahabat_bawaslu', component: SahabatBawasluHome}
]
