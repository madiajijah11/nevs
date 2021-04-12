import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/daftar",
    name: "Daftar",
    component: () => import("../views/Daftar.vue"),
  },
  {
    path: "/masuk",
    name: "Masuk",
    component: () => import("../views/Masuk.vue"),
  },
  {
    path: "/users/profile",
    name: "Profile",
    component: () => import("../views/users/Profile.vue"),
  },
  {
    path: "/users/admin",
    name: "Admin",
    component: () => import("../views/users/PapanAdmin.vue"),
  },
  {
    path: "/users/moderator",
    name: "Moderator",
    component: () => import("../views/users/PapanModerator.vue"),
  },
  {
    path: "/users/pengguna",
    name: "Pengguna",
    component: () => import("../views/users/PapanPengguna.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/masuk", "/daftar", "/home"];
  const authRequired = !publicPages.includes(to.path);
  const telahMasuk = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !telahMasuk) {
    next("/masuk");
  } else {
    next();
  }
});


export default router;
