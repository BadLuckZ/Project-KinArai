import { db } from "../../db";
import {
  MenuType,
  RandomSuggestMenuIdType,
  RandomSuggestMenuType,
} from "./menu.type";

export class MenuRepository {
  // Query a random menu item that wasn't eaten in last 3 days
  static getRandomSuggest(category: string) {
    return db
      .query(
        `
        SELECT m.id, m.name, m.category,
        CAST(julianday('now') - julianday(MAX(h.eaten_at)) AS INTEGER) as days_since
        FROM menu m
        LEFT JOIN history h ON m.id = h.menu_id
        WHERE $category = '' OR m.category = $category
        GROUP BY m.id
        HAVING days_since IS NULL OR days_since >= 3
        ORDER BY RANDOM()
        LIMIT 1
        `,
      )
      .get({ $category: category }) as RandomSuggestMenuType;
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

  // Validate Menu
  static findById(id: number) {
    return db
      .query(
        `
        SELECT id FROM menu WHERE id = $id`,
      )
      .get({ $id: id }) as RandomSuggestMenuIdType;
  }

  // Get All menus
  static getAll() {
    return db
      .query(
        `
        SELECT id, name, category
        FROM menu
        ORDER BY id
        `,
      )
      .all() as MenuType[];
  }

  // Create new menu
  static createMenu(name: string, category: string) {
    const result = db.run(
      `
        INSERT INTO MENU (name, category)
        VALUES (?, ?)
        `,
      [name, category],
    );
    return result.lastInsertRowid as number;
  }

  // Update existing menu
  static update(id: number, name: string, category: string) {
    db.run(
      `
        UPDATE menu 
        SET name = ?, category = ? 
        WHERE id = ?
        `,
      [name, category, id],
    );
  }

  //   Delete all menu's history
  static deleteHistoryByMenuId(menuId: number) {
    db.run(
      `
        DELETE FROM history 
        WHERE menu_id = ?
        `,
      [menuId],
    );
  }

  //   Delete menu
  static delete(id: number) {
    db.run(
      `DELETE FROM menu 
        WHERE id = ?`,
      [id],
    );
  }
}
