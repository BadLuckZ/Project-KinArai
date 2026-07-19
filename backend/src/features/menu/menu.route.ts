import { Elysia, t } from "elysia";
import {
  CreateMenuBody,
  MenuController,
  UpdateMenuBody,
} from "./menu.controller";

export const menuRoutes = new Elysia({ prefix: "/api/v1/menus" })
  .get("/random", ({ set }) => MenuController.getRandom(set))
  .get("/", () => MenuController.getAll())
  .post("/", ({ body }) => MenuController.createMenu(body as CreateMenuBody), {
    body: t.Object({
      name: t.String(),
      category: t.String(),
    }),
  })
  .put(
    "/:id",
    ({ params, body, set }) =>
      MenuController.update(Number(params.id), body as UpdateMenuBody, set),
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        name: t.String(),
        category: t.String(),
      }),
    },
  )

  // 2. เพิ่ม API สำหรับกดยิง DELETE เพื่อลบเมนู
  .delete(
    "/:id",
    ({ params, set }) => MenuController.delete(Number(params.id), set),
    {
      params: t.Object({
        id: t.String(),
      }),
    },
  );
