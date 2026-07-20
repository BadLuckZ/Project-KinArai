import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/home/Home.vue";
import { HOME_NAME, HOME_ROUTE } from "./route.ts";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: HOME_ROUTE,
      name: HOME_NAME,
      component: Home,
    },
  ],
});

export default router;
