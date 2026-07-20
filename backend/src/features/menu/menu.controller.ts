import { Context } from "elysia";
import { MenuRepository } from "./menu.repository";
import { MenuType } from "./menu.type";

export interface ErrorResponse {
  error: string;
}

export interface SuggestionMenu {
  id: number;
  name: string;
  category: string;
  daysSinceLastEaten: number | "never";
  note?: string;
}

export interface CreateMenuBody {
  name: string;
  category: string;
}

export interface UpdateMenuBody {
  name: string;
  category: string;
}

export class MenuController {
  static getRandom(
    category: string,
    set: Context["set"],
  ): SuggestionMenu | ErrorResponse {
    const items = MenuRepository.getRandomSuggest(category);

    if (!items) {
      const fallback = MenuRepository.getFallbackSuggest();
      if (!fallback) {
        set.status = 404;
        return { error: "No menu items found" };
      }
      return {
        id: fallback.id,
        name: fallback.name,
        category: fallback.category,
        daysSinceLastEaten: 0,
        note: "All items eaten recently, picking randomly",
      };
    }

    return {
      id: items.id,
      name: items.name,
      category: items.category,
      daysSinceLastEaten: items.days_since ?? "never",
    };
  }

  static getAll(): MenuType[] {
    return MenuRepository.getAll();
  }

  static createMenu(body: CreateMenuBody) {
    const newId = MenuRepository.createMenu(body.name, body.category);
    return { success: true, id: newId };
  }

  static update(id: number, body: UpdateMenuBody, set: Context["set"]) {
    const item = MenuRepository.findById(id);
    if (!item) {
      set.status = 404;
      return { error: "Menu item not found" };
    }

    MenuRepository.update(id, body.name, body.category);
    return { success: true, id, name: body.name, category: body.category };
  }

  static delete(id: number, set: Context["set"]) {
    const item = MenuRepository.findById(id);
    if (!item) {
      set.status = 404;
      return { error: "Menu item not found" };
    }

    MenuRepository.deleteHistoryByMenuId(id);
    MenuRepository.delete(id);

    return { success: true, message: "Deleted" };
  }
}
