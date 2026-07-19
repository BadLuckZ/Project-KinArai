import { Elysia } from "elysia";
import { menuRoutes } from "./features/menu/menu.route";
import { historyRoutes } from "./features/history/history.route";

const app = new Elysia().use(menuRoutes).use(historyRoutes).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
