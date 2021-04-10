import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
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
    path: "/users/dashboard",
    name: "Dashboard",
    component: () => import("../views/users/Dashboard.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
