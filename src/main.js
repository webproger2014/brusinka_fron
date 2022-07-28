
import Vue from 'vue'
import store from './store'
import axios from 'axios'
import VueCookies from 'vue-cookies';

import modules from './modules/module';
import widgets from './widgets/widget';
import workers from './workers/worker';

Vue.prototype.$axios = axios.create({
  baseURL: 'https://vevanta.ru/api/',
})

Vue.config.productionTip = false
Vue.use(VueCookies);

let components = {
  'clients': () => import('./components/clients/index'),
  'NewBunner': () => import('./components/NewBunner'),
  'SlotFixed': () => import('./components/SlotFixed'),
  'Ipoteka': () => import('./components/Ipoteka'),
  'ManagerItem': () => import('./components/ManagerItem'),
  'SearchFilterHome': () => import('./components/SearchFilterHome'),
  'Consultation': () => import('./components/Consultation'),
  'SlotModal': () => import('./components/SlotModal'),
  'FormPhone': () => import('./components/FormPhone'),
  'FormTwo': () => import('./components/FormTwo'),
  'FormPhone': () => import('./components/FormPhone'),
  'IpotekaCalc': () => import('./components/IpotekaCalc'),
  'Quiz1': () => import('./components/Quiz1'),
  'VideoDesctop': () => import('./components/VideoDesctop'),
  'NavBottom': () => import('./components/NavBottom'),
  'TextOverflow': () => import('./components/TextOverflow'),
  'textOverflows': () => import('./components/TextOverflows'),
  'PhotoReport': () => import('./components/PhotoReport'),
  ...modules,
  ...widgets,
  ...workers
}


let vm = new Vue({
  store,
  el: '#app',
  components
}).$mount()
