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
      name: "Home",
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
      path: "/akun/profile",
      name: "Profile",
      // lazy-loaded
      component: () => import("./views/Profile.vue"),
      meta: {
        title: "Profile",
      },
    },
    {
      path: "/akun/admin",
      name: "Admin",
      // lazy-loaded
      component: () => import("./views/PapanAdmin.vue"),
      meta: {
        title: "Dashboard Admin",
      },
    },
    {
      path: "/akun/moderator",
      name: "Moderator",
      // lazy-loaded
      component: () => import("./views/PapanModerator.vue"),
      meta: {
        title: "Dashboard Moderator",
      },
    },
    {
      path: "/akun/pengguna",
      name: "Pengguna",
      // lazy-loaded
      component: () => import("./views/PapanPengguna.vue"),
      meta: {
        title: "Dashboard Pengguna",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const PagePublik = ["/masuk", "/daftar", "/home"];
  const perluAuth = !PagePublik.includes(to.path);
  const telahMasuk = localStorage.getItem("pengguna");

  document.title = to.meta.title || "Bank Rakyat Indonesia";

  // mencoba mengakses halaman terbatas + belum masuk
  // redirect ke halaman login
  if (perluAuth && !telahMasuk) {
    next("/masuk");
  } else {
    next();
  }
});
