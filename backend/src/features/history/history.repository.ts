import { db } from "../../db";
import { HistoryRow } from "./history.type";

export class HistoryRepository {
  // create menu's histroy
  static createHistory(menuId: number) {
    db.run(
      `
        INSERT INTO history (menu_id, eaten_at)
        VALUES (?, datetime('now'))
        `,
      [menuId],
    );
  }

  //   get history
  static getHistory() {
    return db
      .query(
        `
      SELECT h.id, m.name, m.category, h.eaten_at
      FROM history h
      JOIN menu m ON h.menu_id = m.id
      ORDER BY h.eaten_at DESC, h.id DESC
      LIMIT 30
    `,
      )
      .all() as HistoryRow[];
  }
}
