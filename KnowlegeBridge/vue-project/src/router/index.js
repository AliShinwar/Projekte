import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import BenutzerHinzufuegen from '@/components/EingabeContainer.vue';
import PlatformInfo from '@/components/PlatformInfo.vue';
import Services from '@/components/Services.vue';
import Team from '@/components/Team.vue';
import Kontakt from '@/components/Kontakt.vue';
import FragenHinzufuegen from '@/components/FragenHinzufuegen.vue';
import Schueler from '@/components/Schueler.vue';
import Editor from '@/components/Editor.vue';
import FragenLoeschen from '@/components/FragenLoeschen.vue';
import HomeSeite from '@/components/HomeSeite.vue';
import Ergebnis from '@/components/Ergebnis.vue'; // Importieren Sie die Ergebnisseite
import UsersLoeschen from '@/components/UsersLoeschen.vue';
import Admin from '@/components/Admin.vue';
import StatusDesTeilnehmers from '@/components/StatusDesTeilnehmers.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/benutzerhinzufuegen', name: 'BenutzerHinzufuegen', component: BenutzerHinzufuegen},
  { path: '/fragenhinzufuegen', name: 'FragenHinzufuegen', component: FragenHinzufuegen },
  { path: '/editor', name: 'Editor', component: Editor },
  { path: '/fragenloeschen', name: 'FragenLoeschen', component: FragenLoeschen },
  { path: '/schueler', name: 'Schueler', component: Schueler },
  { path: '/', name: 'HomeSeite', component: HomeSeite },
  { path: '/usersloeschen', name: 'UsersLoeschen', component: UsersLoeschen },
  { path: '/admin', name: 'Admin', component: Admin},
  { path: '/statusDesTeilnehmers', name: 'StatusDesTeilnehmers', component: StatusDesTeilnehmers }, 
  { path: '/platforminfo', name: 'PlatformInfo', component: PlatformInfo },
  { path: '/services', name: 'Services', component: Services },
  { path: '/team', name: 'Team', component: Team },
  { path: '/kontakt', name: 'Kontakt', component: Kontakt },
  { path: '/ergebnis', name: 'Ergebnis', component: Ergebnis }, // Definieren Sie die Route für die Ergebnisseite
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authenticated');

  if (to.path !== '/login' && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }

});


export default router;
