import { Elysia, t } from "elysia";
import { CreateMenuBody, MenuController } from "./menu.controller";

export const menuRoutes = new Elysia({ prefix: "/api/v1/menus" })
  .get("/random", ({ set }) => MenuController.getRandom(set))
  .get("/", () => MenuController.getAll())
  .post("/", ({ body }) => MenuController.createMenu(body as CreateMenuBody), {
    body: t.Object({
      name: t.String(),
      category: t.String(),
    }),
  });
