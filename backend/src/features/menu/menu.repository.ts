import { db } from "../../db";
import { RandomSuggestMenuIdType, RandomSuggestMenuType } from "./menu.type";

export class MenuRepository {
  // Query a random menu item that wasn't eaten in last 3 days
  static getRandomSuggest() {
    return db
      .query(
        `
        SELECT m.id, m.name, m.category,
        CAST(julianday('now') - julianday(MAX(h.eaten_at)) AS INTEGER) as days_since
        FROM menu m
        LEFT JOIN history h ON m.id = h.menu_id
        GROUP BY m.id
        HAVING days_since IS NULL OR days_since >= 3
        ORDER BY RANDOM()
        LIMIT 1
        `,
      )
      .get() as RandomSuggestMenuType;
  }

  // Query a random menu
  static getFallbackSuggest() {
    return db
      .query(
        `
        SELECT id, name, category 
        FROM menu 
        ORDER BY RANDOM() 
        LIMIT 1
        `,
      )
      .get() as RandomSuggestMenuType;
  }

  //   Validate Menu ID
  static findById(id: number) {
    return db
      .query(
        `
        SELECT id FROM menu WHERE id = $id`,
      )
      .get({ $id: id }) as RandomSuggestMenuIdType;
  }
}
