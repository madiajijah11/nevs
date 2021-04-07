// src/router.js (Vue CLI 1.x & 2.x) or src/router/index.js (Vue CLI 3.x or newer)

import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";
import Daftar from "./views/Daftar.vue";
import Masuk from "./views/Masuk.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/daftar",
      name: "daftar",
      component: Daftar,
    },
    {
      path: "/masuk",
      name: "masuk",
      component: Masuk,
    },
  ],
});
