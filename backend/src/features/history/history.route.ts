import { Elysia, t } from "elysia";
import { HistoryController, ConfirmBody } from "./history.controller";

export const historyRoutes = new Elysia({ prefix: "/api/v1/history" })
  .get("/", () => HistoryController.getHistory())
  .post(
    "/",
    ({ body, set }) =>
      HistoryController.createHistory(body as ConfirmBody, set),
    {
      body: t.Object({
        menuId: t.Number(),
      }),
    },
  );
