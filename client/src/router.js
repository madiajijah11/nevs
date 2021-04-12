import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Masuk from "./views/Masuk.vue";
import Daftar from "./views/Daftar.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/masuk",
      component: Masuk,
    },
    {
      path: "/daftar",
      component: Daftar,
    },
    {
      path: "/profile",
      name: "profile",
      // lazy-loaded
      component: () => import("./views/Profile.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      // lazy-loaded
      component: () => import("./views/PapanAdmin.vue"),
    },
    {
      path: "/moderator",
      name: "moderator",
      // lazy-loaded
      component: () => import("./views/PapanModerator.vue"),
    },
    {
      path: "/pengguna",
      name: "pengguna",
      // lazy-loaded
      component: () => import("./views/PapanPengguna.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const PagePublik = ["/masuk", "/daftar", "/home"];
  const perluAuth = !PagePublik.includes(to.path);
  const telahMasuk = localStorage.getItem("pengguna");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (perluAuth && !telahMasuk) {
    next("/masuk");
  } else {
    next();
  }
});
