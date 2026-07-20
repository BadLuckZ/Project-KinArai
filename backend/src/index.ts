import { Elysia } from "elysia";
import { menuRoutes } from "./features/menu/menu.route";
import { historyRoutes } from "./features/history/history.route";
import cors from "@elysia/cors";

const app = new Elysia()
  .use(cors())
  .get("/", () => {
    return { status: true, timestamp: new Date().toISOString() };
  })
  .use(menuRoutes)
  .use(historyRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
