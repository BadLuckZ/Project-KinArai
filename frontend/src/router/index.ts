import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/home/Home.vue";
import {
  HISTORY_NAME,
  HISTORY_ROUTE,
  HOME_NAME,
  HOME_ROUTE,
  MENU_NAME,
  MENU_ROUTE,
} from "./route.ts";
import History from "../components/history/History.vue";
import Menu from "../components/menu/Menu.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: HOME_ROUTE,
      name: HOME_NAME,
      component: Home,
    },
    {
      path: HISTORY_ROUTE,
      name: HISTORY_NAME,
      component: History,
    },
    {
      path: MENU_ROUTE,
      name: MENU_NAME,
      component: Menu,
    },
  ],
});

export default router;
