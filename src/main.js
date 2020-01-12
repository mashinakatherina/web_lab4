import Vue from 'vue'
import VueRouter from "vue-router"

import App from './App.vue'
import Home from "@/components/Home";
import Main from "@/components/Main";
import Login from "@/components/Login";
import Registration from "@/components/Registration";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  {path: '/', component: Home},
  {path: '/main', component: Main},
  {path: '/login', component: Login},
  {path: '/registration', component: Registration},
];

const router = new VueRouter({routes});

new Vue({
  el: '#app',
  components: {App},
  router,
  render: h => h(App),
}).$mount('#app');

