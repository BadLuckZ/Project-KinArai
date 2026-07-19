import { Elysia } from "elysia";
import { MenuController } from "./menu.controller";

export const menuRoutes = new Elysia({ prefix: "/api/v1/menus" }).get(
  "/random",
  ({ set }) => MenuController.getRandom(set),
);
